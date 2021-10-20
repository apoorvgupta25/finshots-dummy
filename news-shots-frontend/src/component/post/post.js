import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {API} from '../../backend';

import styles from './post.module.css';

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

    // <span> <a href={`/tag/${category}`}> {category}</a></span>
    return (

        <div className="">
            <NavbarTop/>

            <div className={styles.postContainer}>
                <div className={styles.headingMeta}>
                    <span> {date.toString().slice(3, 16)} / </span>

                    <Link
                        style={{ textDecoration:'none',}}
                        to={{
                            pathname:`/tag/${category}`,
                            state: {
                              categoryId: post.category._id,
                            },
                        }}>{category}
                    </Link>
                </div>

                <div className={styles.title}>{title}</div>
                <img className={styles.image} src={imageURL}/>

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
