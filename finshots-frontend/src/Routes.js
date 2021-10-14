import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './component/home/home';
import Daily from './component/daily/daily';
import Post from './component/post/post';
import Category from './component/category/category.js';

import Signup from './auth/signup';
import Signin from './auth/signin';

import PrivateRoute from './auth/privateRoute';

import Dashboard from './user/dashboard';
import CreateCategory from './user/createCategory';
import ManageCategories from './user/manageCategories';
import CreatePost from './user/createPost';
import ManagePosts from './user/managePosts';
import UpdatePost from './user/updatePost';
import UpdateCategory from './user/updateCategory';

import NotFound from './NotFound.js';

// <Route path="/signup" exact component={Signup}/>
export default function Routes(){
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/daily" exact component={Daily}/>
                <Route path="/daily/:postName" exact component={Post}/>
                <Route path="/tag/:categoryId" exact component={Category}/>

                <Route path="/signin" exact component={Signin}/>

                <PrivateRoute path="/dashboard/:userId" exact component={Dashboard}/>

                <PrivateRoute path="/create/category" exact component={CreateCategory}/>
                <PrivateRoute path="/manage/categories" exact component={ManageCategories}/>
                <PrivateRoute path="/update/category/:categoryId" exact component={UpdateCategory}/>

                <PrivateRoute path="/create/post" exact component={CreatePost}/>
                <PrivateRoute path="/manage/posts" exact component={ManagePosts}/>
                <PrivateRoute path="/update/post/:postId" exact component={UpdatePost}/>

                <Route component = {NotFound}/>
            </Switch>
        </Router>
    )
}
