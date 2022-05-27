import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';

import {API} from '../../backend';

import NavbarTop from '../Navbar';
import NotFound from '../../NotFound.js';
import ThreeDotsWave from '../animation/ThreeDotsWave';

import {getDailyPosts, getPostsCount, getPostsByIndex, getPostsByCreated} from './dailyAPICalls';
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
                    <header className="daily-title two-line-limit">{title}</header>
                </Link>
                <p className="two-line-limit">{description}</p>
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
    const [numberOfPages, setNumberOfPages] = useState([]);
    const [totalPosts, setTotalPosts] = useState(0)
    const [loading, setLoading] = useState(true);
    const perPageItems = 8;

    var {page} = useParams();

    if(page==undefined)
        page=1;

    useEffect(() => {
        const loadAllPosts = () => {
            getDailyPosts()
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setPosts(data);
                }
            })
        };

        const loadCreatePosts = (a, b) => {
            getPostsByCreated(a, b)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setPosts(data);
                }
                setLoading(false);
            })
        };

        // loadAllPosts()
        // loadCreatePosts(new Date(), perPageItems)

        const totalPost = () => {
            getPostsCount()
            .then(data => {
                setTotalPosts(data)
                setNumberOfPages(Math.ceil(data/perPageItems))
            })
        }

        const loadIndexPosts = (a, b) => {
            getPostsByIndex(a, b)
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
        };


        totalPost()
        var n = parseInt(page)-1;
        var startIdx = n*perPageItems;
        loadIndexPosts(startIdx, perPageItems)

    },[loading])

    if((typeof numberOfPages == 'number') && (parseInt(page) > numberOfPages)){
        return <NotFound/>;
    }

    return (

        <div>
            <NavbarTop/>
            <div className="mt-5 daily-card-feed">
                {loading && <ThreeDotsWave/>}
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
                        <Link to={`${parseInt(page)-1}`} onClick={() => {setLoading(true); setPosts([])}} className="link">Newer Post </Link>
                    }
                </div>

                <div className="text-center h4" style={{whiteSpace:"nowrap"}}>
                    {(() => {
                        const options = [];
                        for (let i = 1; i <= numberOfPages; i++) {
                          options.push(<Link to={`/daily/page/${i}`} onClick={() => {setLoading(true); setPosts([])}} className="link" value={i}>{i}&nbsp;</Link>);
                        }
                        return options;
                   })()}
                </div>

                <div className="h4 pb-5 pull-right mr-5">
                    {(typeof numberOfPages == 'number') && (parseInt(page)+1 <= numberOfPages) &&
                        <Link to={`/daily/page/${parseInt(page)+1}`} onClick={() => {setLoading(true); setPosts([])}} className="link">Older Post</Link>
                    }
                </div>
            </div>

        </div>
    )

}
export default Daily;
