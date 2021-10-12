import React, {useState, useEffect} from 'react';
// import {Link} from 'react-router-dom';

import {API} from '../../backend';

import NavbarTop from '../Navbar';

import {getDailyPosts} from './dailyAPICalls';
import './daily.css';

const DailyCard = ({ post }) => {

    const title = post ? post.title : "Default T-shirt";
    const description = post ? post.description : "Default T-shirt Description";
    const time = post ? post.time : "DEFAULT";
    const raw_date = post ? post.createdAt : "DEFAULT";

    const date = new Date(raw_date);

    const imageURL = post ? `${API}/daily/photo/${post._id}` : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg`

    return (
        <div className="daily-card">
            <img className="daily-image" src={imageURL} alt=""/>
            <div className="daily-content">
                <header className="daily-title">{title}</header>
                <p>{description}</p>
            </div>
            <footer className="daily-footer">
                <p> {date.toString().slice(3,16)} </p>

                <p> {time} </p>
            </footer>
        </div>
    );
}

const Daily = () => {

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllPosts = () => {
        getDailyPosts()
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
            <div className="mt-5 daily-card-feed">
                {posts.map((post, index) => {
                    return (
                        <div key={index}>
                            <DailyCard post={post}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}
export default Daily;
