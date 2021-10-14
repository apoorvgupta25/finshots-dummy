import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';

import {API} from '../../backend';

import './home.css';

import NavbarTop from '../Navbar';

import {getLast3Posts} from './homeAPICalls';

const HomeCard= ({ post }) => {

    var title = "title";
    var description = "description";
    var date = "date";
    var imageURL = "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg";
    var name = "title";
    if(post._id){
        title = post.title;
        description = post.description;
        date = new Date(post.createdAt);
        imageURL = `${API}/daily/photo/${post._id}`;
        name = title.replace(/\s+/g, '-').toLowerCase();
    }

    return (
        <div className="home-card">
            <img className="home-image" src={imageURL} alt=""/>
            <div className="home-content">
                <p> {date.toString().slice(3,25)} </p>
                <Link to={{
                    pathname:`/daily/${name}`,
                    state: { postId: post._id },
                }}>
                    <header className="home-title">{title}</header>
                </Link>
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
