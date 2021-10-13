import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './component/home/home';
import Daily from './component/daily/daily';
import Post from './component/post/post';

import NotFound from './NotFound.js';

export default function Routes(){
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/daily" exact component={Daily}/>
                <Route path="/daily/:postId" exact component={Post}/>

                <Route component = {NotFound}/>
            </Switch>
        </Router>
    )
}
