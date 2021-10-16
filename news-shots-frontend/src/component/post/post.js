import React, {useState, useEffect} from 'react';
import {Link, withRouter, useLocation} from 'react-router-dom';

import {API} from '../../backend';

import {getPost} from './postAPICalls';

import NavbarTop from '../Navbar';
import PostContent from './postContent';

const Post = ({ match }) => {

    const { state } = useLocation();

    const [post, setPost] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const loadPost = postId => {
        getPost(postId)
        .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setPost(data);
                setLoading(false);
            }
        })
    };

    useEffect(() => {
        loadPost(state.postId);
    },[])

    // fetch gives two responses one is null
    if (isLoading){
        return <div>Loading...</div>;
    }

    var title = post.title;
    var description = post.description;
    var content = post.content;
    var category = post.category.name;
    var date = new Date(post.createdAt);
    var imageURL = `${API}/daily/photo/${post._id}`;
    var author = post.author.name;

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
                    <PostContent content={content}/>
                </div>
                <div className="author"> - By {author}</div>
            </div>
        </div>

    )
}

export default Post;
