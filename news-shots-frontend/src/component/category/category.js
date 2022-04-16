import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';

import NavbarTop from '../Navbar';
import {DailyCard} from '../daily/daily';
import ThreeDotsWave from '../animation/ThreeDotsWave';

import {getCategoryPosts} from './categoryAPICalls';

const Category = ({match}) => {

    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [reload, setReload] = useState(false);

    const loadAllPosts = categoryName => {
        getCategoryPosts(categoryName)
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
        loadAllPosts(match.params.categoryName)
    },[reload])

    return (
        <div >

            <NavbarTop/>
            <div className="mt-5 daily-card-feed">
                {posts.length==0 && <ThreeDotsWave/>}
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
