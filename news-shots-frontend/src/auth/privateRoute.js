import React from 'react';
import {Route, Navigate} from 'react-router-dom';

import {isAuth} from './authAPICalls';

const PrivateRoute = ({ children }) => {
    return isAuth() ? children : <Navigate to='/signin' />;
}

export default PrivateRoute;
