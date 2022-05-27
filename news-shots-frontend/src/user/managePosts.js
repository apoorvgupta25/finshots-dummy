import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {API} from '../backend';
import {isAuth} from '../auth/authAPICalls'
import {getAllPosts, deletePost, getPostsCount, getPostsByIndex} from './helper/postAPICalls';

import NotFound from '../NotFound.js';

import ThreeDotsWave from '../component/animation/ThreeDotsWave';

const ManagePosts = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalPosts, setTotalPosts] = useState(0)
    const [numberOfPages, setNumberOfPages] = useState([]);
    const perPageItems = 10;

    const {user, token} = isAuth();

    var {page} = useParams();

    if(page==undefined)
        page=1;

    const preload = () => {
        getAllPosts()
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else {
                setPosts(data);
            }
            setLoading(false);
        })
    }

    useEffect(() => {
        // preload();

        const totalPost = () => {
            getPostsCount()
            .then(data => {
                setTotalPosts(data);
                setNumberOfPages(Math.ceil(data/perPageItems))
            })
        }

        const loadIndexPosts = (a, b) => {
            getPostsByIndex(a, b)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setPosts(data);
                }
                setLoading(false);
            })
        };

        totalPost()
        var n = parseInt(page)-1;
        var startIdx = n*perPageItems;
        loadIndexPosts(startIdx, perPageItems)

    }, [!loading]);

    console.log(totalPosts);
    if((typeof numberOfPages == 'number') && (parseInt(page) > numberOfPages)){
        return <NotFound/>;
    }

    const deleteThisPost = postName => {
        setLoading(true);
        deletePost(postName, user._id, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else {
                preload();
            }
        });
    };

    const goBack = () => (
        <div className="mt-5 ml-3">
            <Link className="btn btn-sm btn-success mb-3" to={`/dashboard/${user._id}`}>Home</Link>
        </div>
    )

    return (
        <div>
            {goBack()}

            <div className="text-center h2"> {`Showing ${(page-1)*perPageItems+1}-${page*perPageItems} of ${totalPosts} Posts`} </div>
            <div className="row ml-1 pt-4">
                <div className="col-2"><h3>Date</h3></div>
                <div className="col-2"><h3>Image</h3></div>
                <div className="col-2"><h3>Title</h3></div>
                <div className="col-2"><h3>Category</h3></div>
                <div className="col-2"><h3>Author</h3></div>
                <div className="col-1"><h3>Update</h3></div>
                <div className="col-1"><h3>Delete</h3></div>
            </div>

            <br/>

            <div className="col-12">
                {loading && <ThreeDotsWave/>}
                {posts.map((post, index) => {
                    return (
                        (
                            <div key={index} className="row mb-2 ">
                                <div className="col-1">
                                    <h4 className="lead">{(new Date(post.createdAt)).toString().slice(3, 16)}</h4>
                                </div>

                                <div className="col-3">
                                    <img className="daily-image" src={`${API}/daily/photo/${post.link}`} alt=""/>
                                </div>

                                <div className="col-2">
                                    <Link to={`/daily/${post.link}`} target="_blank"><h4 className="lead">{post.title}</h4></Link>
                                </div>

                                <div className="col-2">
                                    <h4 className="lead">{post.category.name}</h4>
                                </div>

                                <div className="col-2">
                                    <h4 className="lead">{post.author.name}</h4>
                                </div>

                                <div className="col-1">
                                    <Link className="btn btn-success" to={`/update/post/${post.link}`}>
                                        <span className="">Update</span>
                                    </Link>
                                </div>
                                <div className="col-1 pr-5">
                                    <button onClick={() => {deleteThisPost(post.link)}} className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        )
                    )
                })}
            </div>
            {page!=1 &&
                <div className="h4 pb-2 pull-left ml-5 mt-5">
                    {page &&
                        <Link to={`${parseInt(page)-1}`} onClick={() => {setLoading(true); setPosts([])}}>Newer Post </Link>}
                </div>
            }

            {(typeof numberOfPages == 'number') && (parseInt(page)+1 <= numberOfPages) &&
                <div className="h4 pb-2 pull-right mr-5 mt-5">
                    {page==1 &&
                        <Link to={`/manage/posts/page/2`} onClick={() => {setLoading(true); setPosts([])}}>Older Post -></Link>}
                    {page!=1 &&
                        <Link to={`${parseInt(page)+1}`} onClick={() => {setLoading(true); setPosts([])}}>Older Post -></Link>}
                </div>
            }
        </div>

    );
}
export default ManagePosts;
