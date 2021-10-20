import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {isAuth} from '../auth/authAPICalls';
import {createCategory} from './helper/categoryAPICalls';

const CreateCategory = () => {

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
            return <h4 className="text-success">Category created Succesefully</h4>
        }
    }

    const warningMessage = () => {
        if(error){
            return <h4 className="text-danger">Failed to Create Category</h4>
        }
    }

    // onSubmit
    const onSubmit = event => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        createCategory(user._id, token, {name})
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
        .catch(console.log('Error in saving Category'));

    }

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to={`/dashboard/${user._id}`}>Home</Link>
        </div>
    )

    return (
        <div className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-2 ">
                    {goBack()}
                </div>

                <div className="col-md-10">
                    {successMessage()}
                    {warningMessage()}
                    <form>
                        <div className="form-group py-2">
                            <p className="lead">Enter the Category Name</p>
                            <input type="text" className="form-control my-3" onChange={handleChange} value={name} autoFocus required placeholder="Ex. Business"/>
                            <button className="btn btn-outline-info" onClick={onSubmit}>Create Category</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default CreateCategory;
