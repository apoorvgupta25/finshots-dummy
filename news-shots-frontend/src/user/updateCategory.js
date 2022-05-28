import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';

import {isAuth} from '../auth/authAPICalls';
import {updateCategory, getCategory} from './helper/categoryAPICalls';

const UpdateCategory = () => {

    const {categoryName} = useParams();

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user, token} = isAuth();

    const handleChange = event => {
        setError("");
        setName(event.target.value);
    }

    const successMessage = () => {
        if(success){
            return <h4 className="text-success">Category updated Succesefully</h4>
        }
    }

    const warningMessage = () => {
        if(error){
            return <h4 className="text-danger">Failed to Update Category</h4>
        }
    }

    const preload = categoryName => {
        getCategory(categoryName)
        .then(data => {
            if(data.error){
                setError(true)
            }
            else{
                setError("");
                setName(data.name);
            }
        })

    }

    useEffect(() => {
        preload(categoryName);
    }, [])

    const onSubmit = event => {
        event.preventDefault();
        setError("");
        setSuccess(false);
        updateCategory(categoryName, user._id, token, {name})
        .then(data => {
            if(data.error){
                setError(true)
            }
            else{
                setError("");
                setSuccess(true);
                setName("");
            }
        })
    }

    const goBack = () => (
        <div className="mt-2">
            <Link className="btn btn-sm btn-success mb-3" to={`/dashboard/${user._id}`}>Home</Link>
        </div>
    )

    return (
        <div className="mt-5">
            <div className="text-center font-weight-bold h1 mb-5">
                Update Category
            </div>

            <div className="container rounded bg-dark p-4" style={{width:"60%"}}>
                <div className="bg-white rounded mx-1">
                    <div className="mx-3 py-2">
                        {goBack()}

                        {successMessage()}
                        {warningMessage()}
                        <form>
                            <div className="form-group py-2 mb-0">
                                <p className="lead">Enter the Category Name</p>
                                <input type="text" className="form-control my-3" onChange={handleChange} value={name} autoFocus required placeholder="For Ex. Summer"/>
                                <button className="btn btn-outline-info" onClick={onSubmit}>Update Category</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default UpdateCategory;
