import React, {useState, useEffect} from 'react';
import {Link, withRouter, useLocation} from 'react-router-dom';

import {API} from '../../backend';

import {getPost} from './postAPICalls';

import NavbarTop from '../Navbar';

const Post = ({ match }) => {

    const { state } = useLocation();

    const [post, setPost] = useState([]);

    const loadPost = postId => {
        getPost(postId)
        .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setPost(data);
            }
        })
    };

    useEffect(() => {
        loadPost(state.postId);
    },[])


    var title = "title";
    var description = "Description";
    var content = "content";
    var category = "category";
    var date = "date";
    var imageURL = "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg";
    var author = "author";

    // fetch gives two responses one is null
    if(post._id){
        title = post.title;
        description = post.description;
        content = post.content;
        category = post.category.name;
        date = new Date(post.createdAt);
        imageURL = `${API}/daily/photo/${post._id}`;
        author = post.author.name;
    }

    return (

        <div className="">
            <NavbarTop/>

            <div className="container">
                <div className="heading">
                    <span className="date"> {date.toString()} </span>
                    <span className="category"> {category} </span>
                    <div className="title">{title}</div>
                    <div className="description"> {description} </div>
                </div>

                <div className="content">
                    <div className="category">
                        LINK {category}
                    </div>
                    {content}
                </div>
                <div className="author"> - By {author}</div>
            </div>
        </div>

    )
}

export default Post;
