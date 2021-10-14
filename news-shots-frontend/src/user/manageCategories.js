import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {isAuth} from '../auth/authAPICalls'
import {getAllCategories, deleteCategory} from './helper/categoryAPICalls';


const ManageCategories = () => {

    const [categories, setCategories] = useState([])

    const {user, token} = isAuth();

    const preload = () => {
        getAllCategories()
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setCategories(data)
            }
        });
    };

    useEffect(() => {
        preload();
    }, []);


    const deleteThisCategory = categoryId => {
        deleteCategory(categoryId, user._id, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                preload();
            }
        });
    };

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to={`/dashboard/${user._id}`}>Admin Home</Link>
        </div>
    )


    return (
        <div>

            {goBack()}
            <br/><br/>

            <div className="container">
                <div className="text-center h2"> {`Total ${categories.length} Categories`} </div>
                <div className="row ">
                    <div className="col-4"><h3>Category Name</h3></div>
                    <div className="col-4 text-center"><h3>Update</h3></div>
                    <div className="col-4 text-center"><h3>Delete</h3></div>
                </div>
            </div>

            <br/>

            <div className="row">
                <div className="col-12">
                    {categories.map((category, index) => {
                        return (
                            <div key={index} className="row text-center mb-2 ">
                                <div className="col-4">
                                    <h4 className="lead">{category.name}</h4>
                                </div>
                                <div className="col-4">
                                    <Link className="btn btn-success" to={`/update/category/${category._id}`}>
                                        <span className="">Update</span>
                                    </Link>
                                </div>
                                <div className="col-4 text-center pr-5">
                                    <button onClick={() => {deleteThisCategory(category._id)}} className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ManageCategories;
