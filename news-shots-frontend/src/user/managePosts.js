import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {API} from '../backend';
import {isAuth} from '../auth/authAPICalls'
import {getAllPosts, deletePost, getPostsCount, getPostsByIndex} from './helper/postAPICalls';

import NotFound from '../NotFound.js';

import ThreeDotsWave from '../component/animation/ThreeDotsWave';

import nextImg from '../assets/next.svg';
import previousImg from '../assets/previous.svg';
import deleteImg from '../assets/delete.svg';
import updateImg from '../assets/update.svg';
import dashboardImg from '../assets/dashboard.svg';

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

    const dashboardButton = () => (
        <Link
            className="btn btn-sm btn-success pull-left"
            style={{fontSize:"20px", marginLeft:"4rem"}}
            to={`/dashboard/${user._id}`}>
            <img
                src={dashboardImg}
                alt="Home"
                style={{width:"25px", marginRight:"10px"}}/>
            Dashboard
        </Link>
    )

    return (
        <div className="mt-5">

            {dashboardButton()}

            <div className="text-center font-weight-bold h1 mb-3" style={{marginRight:"13rem"}}>
                Manage Post
            </div>

            <div className="text-center h2 mb-3"> {`Showing ${(page-1)*perPageItems+1}-${page*perPageItems} of ${totalPosts} Posts`} </div>

            <div className="px-5">
                <table className="table table-hover">
                    <thead>
                        <th style={{width:"12%"}}><h3 className="font-weight-bold">Date</h3></th>
                        <th><h3 className="font-weight-bold">Image</h3></th>
                        <th><h3 className="font-weight-bold">Title</h3></th>
                        <th><h3 className="font-weight-bold">Category</h3></th>
                        <th><h3 className="font-weight-bold">Author</h3></th>
                        <th><h3 className="font-weight-bold">Update</h3></th>
                        <th><h3 className="font-weight-bold">Delete</h3></th>
                    </thead>

                    <tbody>
                        {loading && <ThreeDotsWave/>}
                        {posts.map((post, index) => {
                            return (
                                (
                                    <tr key={index} className="mb-2">
                                        <td><h4 className="lead">{(new Date(post.createdAt)).toString().slice(3, 16)}</h4></td>

                                        <td><img className="daily-image" src={`${API}/daily/photo/${post.link}`} alt=""/></td>

                                        <td><Link to={`/daily/${post.link}`} target="_blank"><h4 className="lead">{post.title}</h4></Link></td>

                                        <td><h4 className="lead">{post.category.name}</h4></td>

                                        <td><h4 className="lead">{post.author.name}</h4></td>

                                        <td className="text-center">
                                            <Link className="btn btn-success" to={`/update/post/${post.link}`}>
                                                <img src={updateImg} style={{width:"35px"}} alt="Update"/>
                                            </Link>
                                        </td>
                                        <td className="text-center">
                                            <button onClick={() => {deleteThisPost(post.link)}} className="btn btn-danger p-0" ><img src={deleteImg} style={{width:"50px"}} alt="Delete"/></button>
                                        </td>
                                    </tr>
                                )
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {page!=1 &&
                <div className="h4 pb-2 pull-left ml-5 mt-5">
                    {page &&
                        <Link to={`/manage/posts/page/${parseInt(page)-1}`} onClick={() => {setLoading(true); setPosts([])}}><img src={previousImg} alt="Previous" style={{width:"30px"}}/> </Link>}
                </div>
            }

            {(typeof numberOfPages == 'number') && (parseInt(page)+1 <= numberOfPages) &&
                <div className="h4 pb-2 pull-right mr-5 mt-5">
                    {page &&
                        <Link to={`/manage/posts/page/${parseInt(page)+1}`} onClick={() => {setLoading(true); setPosts([])}}><img src={nextImg} alt="Next" style={{width:"30px"}}/></Link>}
                </div>
            }
        </div>

    );
}
export default ManagePosts;
