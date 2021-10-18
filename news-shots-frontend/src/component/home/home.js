import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Alert } from 'reactstrap';

import {API} from '../../backend';

import './home.css';

import NavbarTop from '../Navbar';

import { getLast3Posts, addSubscriber } from './homeAPICalls';

const HomeCard= ({ post }) => {

    var title = "title";
    var description = "description";
    var date = "date";
    var imageURL = "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg";
    var name = "title";
    if(post._id){
        name = post.link;
        title = post.title;
        description = post.description;
        date = new Date(post.createdAt);
        imageURL = `${API}/daily/photo/${post.link}`;
    }

    return (
        <div className="home-card">
            <img className="home-image" src={imageURL} alt=""/>
            <div className="home-content">
                <p> {date.toString().slice(3,25)} </p>
                <Link to={`/daily/${name}`}>
                    <header className="home-title">{title}</header>
                </Link>
                <p>{description}</p>
            </div>
        </div>
    );
}

const Home = () => {

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [subError, setSubError] = useState(false);
    const [success, setSuccess] = useState(false);

    const loadAllPosts = () => {
        getLast3Posts()
        .then(data => {
            if (data.error) {
                setError(data.error);
                console.log(error);
            } else {
                setPosts(data);
            }
        })
    };

    useEffect(() => {
        loadAllPosts()
    },[])


    const handleChange = event => {
        setSubError("");
        setEmail(event.target.value);
    }

    const successMessage = () => {
        if(success){
            return (
                <Alert
                    className="col-sm-6 offset-sm-3"
                    color="success"
                    style={{ display: success ? '' : 'none' }}
                    isOpen={success}
                    toggle={onDismiss}>
                    Email Added Succesefully
                </Alert>
            )
        }
    }

    const onDismiss = () => {
        setSuccess(false);
        setSubError("")
    }
    const errorMessage = () => {
        console.log(subError.length);
        if(subError){
            return (
                <Alert
                    className="col-sm-6 offset-sm-3"
                    color="danger"
                    style={{ display: subError ? '' : 'none' }}
                    isOpen={subError.length > 5 ? true : false}
                    toggle={onDismiss}
                >
                {subError}
                </Alert>
            )
        }
    }


    // onSubmit
    const onSubmit = event => {
        event.preventDefault();
        setSubError("");
        setSuccess(false);

        addSubscriber({email})
        .then(data => {
            if(data.error){
                setSubError(data.error)
            }
            else{
                setSubError("");
                setSuccess(true);
                setEmail("");
            }
        })
        .catch(console.log('Error in adding Subscriber'));
    }


    return (

        <div className="">
            <NavbarTop/>

            <div className="container-first">
                <div className="row">
                    <div className="col-sm-6 mt-5 text-center">
                        <h1>Dummy Records</h1>
                    </div>
                    <div className="col-sm-6 mt-5 text-center">
                        <h1>Subscribe</h1>
                        {successMessage()}
                        {errorMessage()}
                        <form className="mr-5 ">
                            <div className="form-group py-2">
                                <input type="text" className="form-control my-3" onChange={handleChange} value={email} autoFocus required placeholder="Enter Email Address"/>
                                <button className="btn btn-outline-info" onClick={onSubmit}>Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="home-card-feed">
                {posts.map((post, index) => {
                    return (
                        <div key={index}>
                            <HomeCard post={post}/>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default Home;
