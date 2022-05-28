import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './component/home/home';
import Daily from './component/daily/daily';
import Post from './component/post/post';
import Category from './component/category/category.js';

import Signup from './auth/signup';
import Signin from './auth/signin';

import PrivateRoute from './auth/privateRoute';

import Dashboard from './user/dashboard';
import ManageCategories from './user/manageCategories';
import CreatePost from './user/createPost';
import ManagePosts from './user/managePosts';
import UpdatePost from './user/updatePost';

import NotFound from './NotFound.js';

// <Route path="/signup" exact element={Signup}/>
export default function AllRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/daily" exact element={<Daily/>}/>
                <Route path="/daily/page/:page" exact element={<Daily/>}/>
                <Route path="/daily/:postName" exact element={<Post/>}/>
                <Route path="/tag/:categoryName" exact element={<Category/>}/>
                <Route path="/tag/:categoryName/page/:page" exact element={<Category/>}/>

                <Route path="/signin" exact element={<Signin/>}/>

                <Route path="/dashboard/:userId" exact element={<PrivateRoute><Dashboard/></PrivateRoute>}/>

                <Route path="/manage/categories" exact element={<PrivateRoute><ManageCategories/></PrivateRoute>}/>

                <Route path="/create/post" exact element={<PrivateRoute><CreatePost/></PrivateRoute>}/>
                <Route path="/manage/posts" exact element={<PrivateRoute><ManagePosts/></PrivateRoute>}/>
                <Route path="/manage/posts/page/:page" exact element={<PrivateRoute><ManagePosts/></PrivateRoute>}/>
                <Route path="/update/post/:postName" exact element={<PrivateRoute><UpdatePost/></PrivateRoute>}/>

                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </Router>
    )
}

/*

*/
