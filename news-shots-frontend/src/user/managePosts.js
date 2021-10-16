import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {isAuth} from '../auth/authAPICalls'
import {getAllPosts, deletePost} from './helper/postAPICalls';

const ManagePosts = () => {

    const [posts, setPosts] = useState([])

    const {user, token} = isAuth();

    const preload = () => {
        getAllPosts()
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else {
                setPosts(data);
            }
        })
    }

    useEffect(() => {
        preload();
    }, []);

    const deleteThisPost = postId => {
        deletePost(postId, user._id, token)
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
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to={`/dashboard/${user._id}`}>Admin Home</Link>
        </div>
    )

    return (
        <div>
            {goBack()}
            <br/><br/>

            <div className="">
                <div className="text-center h2"> {`Total ${posts.length} Posts`} </div>
                <div className="row text-center">
                    <div className="col-2"><h3>Date</h3></div>
                    <div className="col-2"><h3>Title</h3></div>
                    <div className="col-2"><h3>Category</h3></div>
                    <div className="col-2"><h3>Author</h3></div>
                    <div className="col-2 text-center"><h3>Update</h3></div>
                    <div className="col-2 text-center"><h3>Delete</h3></div>
                </div>
            </div>

            <br/>

            <div className="row">
                <div className="col-12">
                    {posts.map((post, index) => {
                        return (
                            (
                                <div key={index} className="row text-center mb-2 ">
                                    <div className="col-2">
                                        <h4 className="lead">{(new Date(post.createdAt)).toString().slice(3, 16)}</h4>
                                    </div>

                                    <div className="col-2">
                                        <h4 className="lead">{post.title}</h4>
                                    </div>

                                    <div className="col-2">
                                        <h4 className="lead">{post.category.name}</h4>
                                    </div>

                                    <div className="col-2">
                                        <h4 className="lead">{post.author.name}</h4>
                                    </div>

                                    <div className="col-2">
                                        <Link className="btn btn-success" to={`/update/post/${post.name}`}>
                                            <span className="">Update</span>
                                        </Link>
                                    </div>
                                    <div className="col-2 text-center pr-5">
                                        <button onClick={() => {deleteThisPost(post.name)}} className="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            )
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
export default ManagePosts;
