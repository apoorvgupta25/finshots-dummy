import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import NavbarTop from '../Navbar';
import NotFound from '../../NotFound.js';
import {DailyCard} from '../daily/daily';
import ThreeDotsWave from '../animation/ThreeDotsWave';

import {getCategoryPosts, getCategoryPostsCount, getCategoryPostsByIndex} from './categoryAPICalls';

const Category = ({match}) => {

    const [posts, setPosts] = useState([]);
    const [reload, setReload] = useState(false);
    const [numberOfPages, setNumberOfPages] = useState([]);
    const [totalPosts, setTotalPosts] = useState(0)
    const [loading, setLoading] = useState(true);
    const perPageItems = 4;

    if(match.params.page==undefined)
        match.params.page=1;

    useEffect(() => {
        const loadAllPosts = categoryName => {
            getCategoryPosts(categoryName)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setReload(!reload);
                    setPosts(data);
                }
            })
        };

        // loadAllPosts(match.params.categoryName)

        const totalCategoryPost = categoryName => {
            getCategoryPostsCount(categoryName)
            .then(data => {
                setTotalPosts(data)
                setNumberOfPages(Math.ceil(data/perPageItems))
            })
        }

        const loadIndexCategoryPosts = (categoryName, a, b) => {
            getCategoryPostsByIndex(categoryName, a, b)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setReload(!reload);
                    setPosts(data);
                }
                setLoading(false);
            })
        };


        totalCategoryPost(match.params.categoryName)
        var n = parseInt(match.params.page)-1;
        var startIdx = n*perPageItems;
        loadIndexCategoryPosts(match.params.categoryName, startIdx, perPageItems)

    },[!reload, !loading])


    if((typeof numberOfPages == 'number') && (parseInt(match.params.page) > numberOfPages)){
        return <NotFound/>;
    }

    return (
        <div >

            <NavbarTop/>
            <div className="mt-5 daily-card-feed">
                {(posts.length==0) && <ThreeDotsWave/>}
                {posts.map((post, index) => {
                    return (
                        <div key={index}>
                            <DailyCard post={post}/>
                        </div>
                    )
                })}
            </div>

            <div className="text-center h4"> {`Showing ${(match.params.page-1)*perPageItems+1}-${Math.min(totalPosts, match.params.page*perPageItems)} Posts`} </div>

            {match.params.page!=1 &&
                <div className="h4 pb-5 pull-left ml-5">
                    {match.params.page &&
                        <Link to={`${parseInt(match.params.page)-1}`} onClick={() => {setLoading(true); setPosts([])}}>Newer Post </Link>}
                </div>
            }

            {(typeof numberOfPages == 'number') && (parseInt(match.params.page)+1 <= numberOfPages) &&
                <div className="h4 pb-5 pull-right mr-5">
                    {match.params.page==1 &&
                        <Link to={`${match.params.categoryName}/page/2`} onClick={() => {setLoading(true); setPosts([])}}>Older Post -></Link>}
                    {match.params.page!=1 &&
                        <Link to={`${parseInt(match.params.page)+1}`} onClick={() => {setLoading(true); setPosts([])}}>Older Post -></Link>}
                </div>
            }
        </div>
    );

}

export default Category;
