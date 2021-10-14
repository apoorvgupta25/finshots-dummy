import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {signout} from '../auth/authAPICalls';
import {isAuth} from '../auth/authAPICalls';

import './dashboard.css';

const Dashboard = ({ match }) => {

    const signoutUser = () => {
        signout()
    }

    const {user: {name, email}} = isAuth();

    const adminLeftSide = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/create/category" className=" text-success">Create Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/manage/categories" className=" text-success">Manage Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/create/post" className=" text-success">Create Post</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/manage/posts" className=" text-success">Manage Posts</Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminRightSide = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header">Info</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Name</span> {name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Email</span> {email}
                    </li>
                    <li className="list-group-item">
                        <Link to="/signin" onClick={signoutUser} className="btn btn-primary">Sign Out</Link>
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <div className="">
            <h1 className="text-center mt-5 mb-5">Dashboard</h1>
            <div className="container bg-warning p-3">
                <div className="row">
                    <div className="col-sm-3">{adminLeftSide()}</div>
                    <div className="col-sm-9">{adminRightSide()}</div>
                </div>
            </div>

        </div>
    );
}
export default Dashboard;
