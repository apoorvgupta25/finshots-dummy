import React, {useState, useEffect} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';

import {updatePost, getPost} from './helper/postAPICalls';
import {isAuth} from '../auth/authAPICalls'
import {getAllCategories} from './helper/categoryAPICalls';

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';

import dashboardImg from '../assets/dashboard.svg';

const editorStateAsJSONString = {"entityMap":{},"blocks":[{"key":"637gr","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

const UpdatePost = () => {

    const {postName} = useParams();

    const [values, setValues] = useState({
        title: '',
        photo: '',
        description: '',
        content: '',
        categories: [],
        category: '',
        author: '',
        createdPost: '',
        error: '',
        formData: ''
    });
    const [contentState, setContentState] = useState(convertFromRaw(editorStateAsJSONString));
    const [editorState, setEditorState]  = useState(EditorState.createWithContent(contentState));
    const [con, setCon] = useState('');
    const [redirect, setRedirect] = useState(false);

    const {title, description, content, categories, category, author, createdPost, error, formData } = values;
    const {user, token} = isAuth();

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value);

        setValues({...values, [name]: value});
        setContentState(convertFromRaw(JSON.parse(con)))
        setEditorState(EditorState.createWithContent(contentState))
    }

    const successMessage = () => {
        return (
            <div className="alert alert-success mt-3" style={{display: createdPost ? "" : "none"}}>
                <h4>{createdPost} Updated Successfully.</h4>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className="alert alert-danger mt-3" style={{display: error ? "" : "none"}}>
                <h4>{error}</h4>
            </div>
        )
    }

    const preload = postName => {
        getPost(postName)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error});
            }
            else{
                setCon(data.content)
                setContentState(convertFromRaw(JSON.parse(data.content)))
                setEditorState(EditorState.createWithContent(contentState))
                setValues({...values,
                    title: data.title,
                    description: data.description,
                    content: data.content,
                    category: data.category._id,
                    formData: new FormData(),
                });
                preloadCategories();
            }
        })

    }

    const preloadCategories = () => {
        getAllCategories()
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }
            else{
                setValues({categories: data, formData: new FormData()})
            }
        })
        .catch()
    }

    useEffect(() => {
        preload(postName);
    }, [])


    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error:"" ,loading: true});
        updatePost(postName, user._id, token, formData)
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error})
                }
                else{
                    setValues({...values,
                        title: "",
                        description: "",
                        content: "",
                        photo: "",
                        author: "",
                        category: "",
                        createdPost: data.title
                    })
                }
            })

        // startTimer();
        setTimeout(() => { setRedirect(true); }, 1000);

    }


    // Redirect
    if(redirect){
        return <Navigate to={`/manage/posts`}/>
    }

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        setContentState(editorState.getCurrentContent());
        setValues({...values, content: JSON.stringify(convertToRaw(editorState.getCurrentContent()))});
        formData.append('content', JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    }

    const editor = () => {
        return (
            <Editor
                editorState = {editorState}
                onEditorStateChange={(editorState) => onEditorStateChange(editorState)}
                wrapperStyle={{ backgroundColor:'white', color: 'black', height: '15em', paddingBottom: '3rem', fontFamily: 'Georgia,sans-serif'}}
                editorStyle = {{padding: '0 0.5rem'}}
                toolbar={{
                    options: ['inline', 'fontSize', 'blockType', 'list', 'link'],
                    blockType: {
                        inDropdown: false,
                        options: ['Normal','Blockquote'],
                    },
                 }}

             />
         )
    }

    const dashboardButton = () => (
        <Link
            className="btn btn-sm btn-success pull-left"
            style={{fontSize:"20px", marginLeft:"0rem"}}
            to={`/manage/posts`}>
            <img
                src={dashboardImg}
                alt="Home"
                style={{width:"25px", marginRight:"10px"}}/>
            Dashboard
        </Link>
    )

    return (
        <div className="container p-4 mt-3">

            {dashboardButton()}
            <div className="text-center font-weight-bold h1 mb-3" style={{marginRight:"10rem"}}>
                Update Post
            </div>

            <div className="bg-dark text-white rounded p-2 pt-3">
                <div className="mx-5">
                    {successMessage()}
                    {errorMessage()}

                    <form>
                        <span>Update Photo</span>
                        <div className="form-group">
                            <label className="btn btn-block btn-warning">
                                <input type="file" name="photo" accept="image" placeholder="choose a file"onChange={handleChange("photo")}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" name="photo" placeholder="Title" onChange={handleChange("title")} value={title} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" name="photo" placeholder="Description" onChange={handleChange("description")} value={description} />
                        </div>
                        <div className="form-group">
                            {editor()}
                        </div>
                        <div className="form-group">
                            <select className="form-control" placeholder="Category" onChange={handleChange("category")}>
                                <option>Select</option>
                                {categories && categories.map((cate, index) => {
                                    return (
                                        <option value={cate._id} key={index}>{cate.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <button className="btn btn-outline-success mb-3 w-100" type="submit" onClick={onSubmit}>Update Post</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default UpdatePost;

/*
//Timer-1
//states
const [timerCount, setTimerCount] = useState(10);
const defaultCount = 3;
const intervalGap = 1000;
const startTimerWrapper = useCallback((func)=>{
    let timeInterval: NodeJS.Timer;
    return () => {
        if(timeInterval) {
            clearInterval(timeInterval)
        }
        setTimerCount(defaultCount)
        timeInterval = setInterval(() => {
            func(timeInterval)
        }, intervalGap)
    }
}, [])

const startTimer = useCallback(startTimerWrapper((intervalfn: NodeJS.Timeout) => {
     setTimerCount((val) => {
        if(val === 0 ) {
            setRedirect(true);
            clearInterval(intervalfn);
            return val
        }
        return val - 1
    })
}), [])

// Timer-2 : Error state not updating inside useCallback
//states
const [timer, setTimer] = useState(0);
const [secs, setSecs] = useState(5);
console.log(secs, timer);

const onClickStartTimer = useCallback(() => {
    if (timer == 0 && secs > 0) {
        setTimer(setInterval(countDown, 1000));
    }
},[]);

const countDown = useCallback(() => {
    let seconds = secs - 1;
    setSecs(secs-1);

    if (seconds == 0) {
        clearInterval(timer);
    }
},[]);
*/
