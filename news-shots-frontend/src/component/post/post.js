import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {API} from '../../backend';

import {getPost} from './postAPICalls';
import draftToHtml from 'draftjs-to-html';

import NavbarTop from '../Navbar';

const Post = ({ match }) => {

    const [post, setPost] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const loadPost = postName => {
        getPost(postName)
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
        loadPost(match.params.postName);
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
    var imageURL = `${API}/daily/photo/${post.link}`;
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
                    <div dangerouslySetInnerHTML= {{ __html: `${draftToHtml(JSON.parse(content))}` }} />
                </div>
                <div className="author"> - By {author}</div>
            </div>
        </div>

    )
}

export default Post;
