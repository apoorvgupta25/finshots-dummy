import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';

import {API} from '../../backend';

import './home.css';

import NavbarTop from '../Navbar';

import {getLast3Posts} from './homeAPICalls';

const HomeCard= ({ post }) => {

    const title = post ? post.title : "Default T-shirt";
    const description = post ? post.description : "Default T-shirt Description";
    const raw_date = post ? post.createdAt : "DEFAULT";
    const date = new Date(raw_date);
    const imageURL = post ? `${API}/daily/photo/${post._id}` : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg`

    return (
        <div className="home-card">
            <img className="home-image" src={imageURL} alt=""/>
            <div className="home-content">
                <p> {date.toString().slice(3,25)} </p>
                <header className="home-title">{title}</header>
                <p>{description}</p>
            </div>
        </div>
    );
}

const Home = () => {

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllPosts = () => {
        getLast3Posts()
        .then(data => {
            if (data.error) {
                setError(data.error);
                console.log(error);
            } else {
                setPosts(data);
            }
        })
    };

    useEffect(() => {
        loadAllPosts()
    },[])


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

            <div className="home-card-feed">
                {posts.map((post, index) => {
                    return (
                        <div key={index}>
                            <HomeCard post={post}/>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default Home;
