import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Alert } from 'reactstrap';

import {API} from '../../backend';

import './home.css';

import NavbarTop from '../Navbar';
import Subscribe from '../Subscribe';
import ThreeDotsWave from '../animation/ThreeDotsWave';

import { getLast3Posts, addSubscriber, confirmSubscriber } from './homeAPICalls';

const HomeCard= ({ post }) => {

    var title = "title";
    var description = "description";
    var date = "date";
    var imageURL = "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg";
    var name = "title";
    if(post._id){
        name = post.link;
        title = post.title;
        description = post.description;
        date = new Date(post.createdAt);
        imageURL = `${API}/daily/photo/${post.link}`;
    }

    return (
        <div className="home-card">
            <img className="home-image" src={imageURL} alt=""/>
            <div className="home-content">
                <p> {date.toString().slice(3, 16)} </p>
                <Link to={`/daily/${name}`}>
                    <header className="home-title two-line-limit">{title}</header>
                </Link>
                <p className="home-description two-line-limit">{description}</p>
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

        <div>
            <NavbarTop/>

            <div className="container-first">
                <div className="row mt-5">
                    <div className="col-sm-8">
                        <h1 className="text-center">Recent Posts</h1>
                        <div className="pt-3 home-card-feed">
                            {posts.length==0 && <ThreeDotsWave/>}
                            {posts.map((post, index) => {
                                return (
                                    <div key={index}>
                                        <HomeCard post={post}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-sm-4 text-center">
                        <h1>Subscribe</h1>
                        <div className="">
                            <Subscribe/>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    )
}

export default Home;
