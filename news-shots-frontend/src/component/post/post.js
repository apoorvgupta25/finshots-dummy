import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';

import {API} from '../../backend';

import styles from './post.module.css';

import {getPost} from './postAPICalls';
import draftToHtml from 'draftjs-to-html';

import NavbarTop from '../Navbar';
import NotFound from '../../NotFound.js';
import BouncingBall from '../animation/BouncingBall';

const Post = () => {

    const { postName } = useParams();

    const [post, setPost] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const loadPost = postName => {
        getPost(postName)
        .then(data => {
            if (data.error) {
                setNotFound(true);
                setLoading(false);
            } else {
                setPost(data);
                setLoading(false);
                setNotFound(false);
            }
        })
    };

    useEffect(() => {
        loadPost(postName);
    },[])

    // fetch gives two responses one is null
    if (isLoading){
        return (
            <>
                <NavbarTop/>
                <div className="mt-5 pt-5">
                    <BouncingBall/>;
                </div>
            </>
        )
    }

    if(notFound){
        return <NotFound/>;
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

            <div className={styles.postContainer}>
                <div className={styles.headingMeta}>
                    <span> {date.toString().slice(3, 16)} / </span>

                    <Link
                        style={{ textDecoration:'none',}}
                        to={`/tag/${category}`}>{category}
                    </Link>
                </div>

                <div className={styles.title}>{title}</div>
                <img className={styles.image} src={imageURL} alt=""/>

                <div className={styles.content}>
                    <div className={styles.description}>{description} </div>
                    <div className={styles.category}> {category}</div>
                    <div dangerouslySetInnerHTML= {{ __html: `${draftToHtml(JSON.parse(content))}` }} />
                    <div className="pull-right"> - By {author}</div>
                </div>
            </div>
        </div>

    )
}

export default Post;
