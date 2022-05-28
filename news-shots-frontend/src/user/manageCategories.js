import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {isAuth} from '../auth/authAPICalls';
import {createCategory, getAllCategories, deleteCategory} from './helper/categoryAPICalls';

const ManageCategories = () => {

    const [categories, setCategories] = useState([])
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [reload, setReload] = useState(false);

    const {user, token} = isAuth();

    const preload = () => {
        getAllCategories()
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setReload(!reload);
                setCategories(data)
            }
        });
    };

    useEffect(() => {
        preload();
    }, [!reload]);

    const deleteThisCategory = categoryName => {
        deleteCategory(categoryName, user._id, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                preload();
            }
        });
    };

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
        <div className="mt-2">
            <Link className="btn btn-sm btn-success mb-3" to={`/dashboard/${user._id}`}>Home</Link>
        </div>
    )

    return (
        <div className="mt-5">
            <div className="text-center font-weight-bold h1 mb-5">
                Manage Category
            </div>

            <div className="row">

                <div className="col-7 px-0">
                    <div className="container bg-dark rounded p-4" style={{width:"80%"}}>
                        <div className="bg-white rounded mx-1">
                            <div className="mx-3 py-2">
                                {goBack()}

                                {successMessage()}
                                {warningMessage()}
                                <form>
                                    <div className="form-group py-2 mb-0">
                                        <p className="lead">Enter the Category Name</p>
                                        <input type="text" className="form-control my-3" onChange={handleChange} value={name} autoFocus required placeholder="Ex. Business"/>
                                        <button className="btn btn-outline-info" onClick={onSubmit}>Create Category</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-5 px-0">
                    <div className="container my-4">
                        <div className="text-center h3"> {`Total ${categories.length} Categories`} </div>
                        <div className="row mt-4 text-center h4">
                            <div className="col-4 px-0">Category Name</div>
                            <div className="col-4 px-0">Update</div>
                            <div className="col-4 px-0">Delete</div>
                        </div>
                    </div>

                    {categories.map((category, index) => {
                        return (
                            <div key={index} className="row text-center mb-2 ">
                                <div className="col-4 px-0">
                                    <h4 className="lead">{category.name}</h4>
                                </div>
                                <div className="col-4 px-0">
                                    <Link className="btn btn-success" to={`/update/category/${category.name}`}>
                                        <span className="">Update</span>
                                    </Link>
                                </div>
                                <div className="col-4 text-center pr-5 px-0">
                                    <button onClick={() => {deleteThisCategory(category.name)}} className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>



        </div>


    );
}

export default ManageCategories;
