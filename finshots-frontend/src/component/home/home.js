import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';

import './home.css';

import NavbarTop from '../Navbar';

export default function Home(){

    return (

        <div className="">
            <NavbarTop/>

            <div className="container-first">
                <div className="row">
                    <div className="col-sm-6 mt-5 text-center">
                        <h1>Dummy Records</h1>
                    </div>
                    <div className="col-sm-6 mt-5 text-center">
                        <h1>Subscribe</h1>
                    </div>
                </div>
            </div>

            <div className="daily">
                
            </div>
        </div>

    )
}
