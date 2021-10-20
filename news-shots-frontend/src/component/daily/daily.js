import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {API} from '../../backend';

import NavbarTop from '../Navbar';

import {getDailyPosts} from './dailyAPICalls';
import './daily.css';

export const DailyCard = ({ post }) => {

    var title = "title";
    var description = "description";
    var date = "date";
    const time = "DEFAULT";
    var imageURL = "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg";
    var name = "title";
    if(post._id){
        title = post.title;
        description = post.description;
        date = new Date(post.createdAt);
        imageURL = `${API}/daily/photo/${post.link}`;
        name = post.link;
    }

    return (
        <div className="daily-card">
            <img className="daily-image" src={imageURL} alt=""/>
            <div className="daily-content">
                <Link to={`/daily/${name}`}>
                    <header className="daily-title">{title}</header>
                </Link>
                <p className="daily-description">{description}</p>
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
