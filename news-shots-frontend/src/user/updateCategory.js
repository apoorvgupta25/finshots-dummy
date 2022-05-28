import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';

import {isAuth} from '../auth/authAPICalls';
import {updateCategory, getCategory} from './helper/categoryAPICalls';

import dashboardImg from '../assets/dashboard.svg';

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

    const dashboardButton = () => (
        <Link
            className="btn btn-sm btn-success pull-left"
            style={{fontSize:"20px", marginLeft:"19rem"}}
            to={`/dashboard/${user._id}`}>
            <img
                src={dashboardImg}
                alt="Home"
                style={{width:"25px", marginRight:"10px"}}/>
            Dashboard
        </Link>
    )

    return (
        <div className="mt-5">

            {dashboardButton()}

            <div className="text-center font-weight-bold h1 mb-5" style={{marginRight:"25rem"}}>
                Update Category
            </div>

            <div className="container rounded bg-dark p-4" style={{width:"60%"}}>
                <div className="bg-white rounded mx-1">
                    <div className="mx-3 py-2">

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
