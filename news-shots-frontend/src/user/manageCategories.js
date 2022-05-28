import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {isAuth} from '../auth/authAPICalls';
import {createCategory, getAllCategories, deleteCategory} from './helper/categoryAPICalls';

import deleteImg from '../assets/delete.svg';
import updateImg from '../assets/update.svg';
import dashboardImg from '../assets/dashboard.svg';

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

    const dashboardButton = () => (
        <Link
            className="btn btn-sm btn-success pull-left"
            style={{fontSize:"20px", marginLeft:"5rem"}}
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

            <div className="text-center font-weight-bold h1 mb-5" style={{marginRight:"15rem"}}>
                Manage Category
            </div>

            <div className="row">

                <div className="col-7 px-0">
                    <div className="container bg-dark rounded p-4" style={{width:"80%"}}>
                        <div className="bg-white rounded mx-1">
                            <div className="mx-3 py-2">

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
                    <div className="text-center h3"> {`Total ${categories.length} Categories`} </div>

                    <div className="px-5">
                        <table className="table table-hover">
                            <thead>
                                <th><h3 className="font-weight-bold">Category Name</h3></th>
                                <th><h3 className="font-weight-bold">Update</h3></th>
                                <th><h3 className="font-weight-bold">Delete</h3></th>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => {
                                    return (
                                        <tr key={index} className="mb-2">
                                            <td><h4 className="lead">{category.name}</h4></td>
                                            <td className="text-center">
                                                <Link className="btn btn-success" to={`/update/category/${category.name}`}>
                                                    <img src={updateImg} style={{width:"25px"}} alt="Update"/>
                                                </Link>
                                            </td>
                                            <td className="text-center">
                                                <button onClick={() => {deleteThisCategory(category.name)}} className="btn btn-danger p-0"><img src={deleteImg} style={{width:"40px"}} alt="Delete"/></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>


    );
}

export default ManageCategories;
