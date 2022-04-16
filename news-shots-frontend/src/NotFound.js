import React from 'react';
import {Link} from 'react-router-dom';

import notfound from './notfound.svg';

const NotFound = () => {
    return (
        <div className="text-white ">
            <img src={notfound} style={imgStyle} alt=""/><br/><br/>

            <div className="d-flex justify-content-center">
                <h2 style={errorStyle}>404 ERROR</h2>
            </div>
            <div className="d-flex justify-content-center">
                <h2 className="">SORRY, NOT FOUND</h2>
            </div><br/>
            <div className="d-flex justify-content-center">
                <Link to="/" className="btn btn-primary ">Back To Home</Link>

            </div>
        </div>

    )
}

const errorStyle = {
    padding: '0.5% 2%',
    textAlign: 'center',
    display: 'inline-block',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: '8px',
    backgroundColor: '#D63C36'
}

const imgStyle = {
    display: 'block',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '7%',
    // height: '50vw'
    width: '40vw',
};
export default NotFound;
