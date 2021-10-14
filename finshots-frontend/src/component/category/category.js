import React, {useState, useEffect} from 'react';
import {Link, withRouter, useLocation} from 'react-router-dom';

import NavbarTop from '../Navbar';
import {DailyCard} from '../daily/daily';

import {getCategoryPosts} from './categoryAPICalls';

const Category = () => {

    const { state } = useLocation();
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [reload, setReload] = useState(false);

    const loadAllPosts = categoryId => {
        getCategoryPosts(categoryId)
        .then(data => {
            if (data.error) {
                setError(data.error);
                console.log(error);
            } else {
                setReload(!reload);
                setPosts(data);
            }
        })
    };

    useEffect(() => {
        loadAllPosts(state.categoryId)
    },[reload])
    // .filter(post => post.category._id === post._id)

    console.log(posts);

    return (
        <div >

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
    );

}

export default Category;
