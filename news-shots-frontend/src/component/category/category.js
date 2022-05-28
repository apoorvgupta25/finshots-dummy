import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';

import NavbarTop from '../Navbar';
import NotFound from '../../NotFound.js';
import {DailyCard} from '../daily/daily';
import ThreeDotsWave from '../animation/ThreeDotsWave';

import nextImg from '../../assets/next.svg';
import previousImg from '../../assets/previous.svg';

// import '../daily/daily.css';
import {getCategoryPosts, getCategoryPostsCount, getCategoryPostsByIndex} from './categoryAPICalls';

const Category = () => {

    const [posts, setPosts] = useState([]);
    const [reload, setReload] = useState(false);
    const [numberOfPages, setNumberOfPages] = useState([]);
    const [totalPosts, setTotalPosts] = useState(0)
    const [loading, setLoading] = useState(true);
    const perPageItems = 4;

    var {page, categoryName} = useParams();

    if(page==undefined)
        page=1;

    useEffect(() => {
        const loadAllPosts = categoryName => {
            getCategoryPosts(categoryName)
            .then(data => {
                setReload(!reload);
                setPosts(data);
            })
        };

        // loadAllPosts(categoryName)

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


        totalCategoryPost(categoryName)
        var n = parseInt(page)-1;
        var startIdx = n*perPageItems;
        loadIndexCategoryPosts(categoryName, startIdx, perPageItems)

    },[!reload, !loading])


    if((typeof numberOfPages == 'number') && (parseInt(page) > numberOfPages)){
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

            <div className="text-center h4"> {`Showing ${(page-1)*perPageItems+1}-${Math.min(totalPosts, page*perPageItems)} Posts`} </div>
            <div className="footer-container">

                <div className="h4 pb-5 pull-left ml-5">
                    {page!=1 &&
                        <Link to={`/tag/${categoryName}/page/${parseInt(page)-1}`} onClick={() => {setLoading(true); setPosts([])}}  className="link pull-right mr-2"><img src={previousImg} alt="Previous" style={{width:"30px"}}/></Link>
                    }
                </div>


                <div className="text-center h4" style={{whiteSpace:"nowrap"}}>
                    {(() => {
                        const options = [];

                        for (let i = 1; i <= numberOfPages; i++) {
                          options.push(<Link to={`/daily/page/${i}`} onClick={() => {setLoading(true); setPosts([])}} className="link" style={{color: parseInt(page)===i ? 'black' : ''}} value={i}>{i}&nbsp;</Link>);
                        }
                        return options;
                   })()}
                </div>


                <div className="h4 pb-5 pull-right mr-5">
                    {(typeof numberOfPages == 'number') && (parseInt(page)+1 <= numberOfPages) &&
                        <Link to={`/tag/${categoryName}/page/${parseInt(page)+1}`} onClick={() => {setLoading(true); setPosts([])}}><img src={nextImg} alt="Next" style={{width:"30px"}}/></Link>
                    }
                </div>
            </div>
        </div>
    );

}

export default Category;
