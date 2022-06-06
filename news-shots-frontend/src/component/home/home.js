import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {API} from '../../backend';
import { getLast3Posts } from './homeAPICalls';

import NavbarTop from '../Navbar';
import Subscribe from '../Subscribe';
import ThreeDotsWave from '../animation/ThreeDotsWave';

import './home.css';

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
                <p> {date.toString().slice(3, 16)} </p>
                <Link to={`/daily/${name}`}>
                    <header className="home-title two-line-limit">{title}</header>
                </Link>
                <p className="home-description two-line-limit">{description}</p>
            </div>
        </div>
    );
}

const Home = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const loadAllPosts = () => {
            getLast3Posts()
            .then(data => {
                setPosts(data);
            })
        };
        loadAllPosts()

    },[])

    return (

        <div>
            <NavbarTop/>

            <div className="container-first">
                <div className="row mt-5">
                    <div className="col-sm-8">
                        <h1 className="text-center">Recent Posts</h1>
                        <div className="pt-3 home-card-feed">
                            {posts.length===0 && <ThreeDotsWave/>}
                            {posts.map((post, index) => {
                                return (
                                    <div key={index}>
                                        <HomeCard post={post}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-sm-4 text-center">
                        <h1>Subscribe</h1>
                        <Subscribe/>
                    </div>
                </div>
            </div>

            <footer className="text-center">
                Made with &nbsp;
                <i class="fa fa-heart" style={{color:"red"}}></i>
                &nbsp; by&nbsp;
                <a href="https://apoorvgupta.gitlab.io/" target="_blank" rel="noreferrer">Apoorv</a>
            </footer>

        </div>

    )
}

export default Home;
