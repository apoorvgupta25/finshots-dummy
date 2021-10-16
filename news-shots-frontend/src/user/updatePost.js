import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {updatePost, getPost} from './helper/postAPICalls';
import {isAuth} from '../auth/authAPICalls'
import {getAllCategories} from './helper/categoryAPICalls';

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';

const editorStateAsJSONString = {"entityMap":{},"blocks":[{"key":"637gr","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

const UpdatePost = ({match}) => {

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
                <h4>{createdPost} Updated Successfully</h4>
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

    const preload = postId => {
        getPost(postId)
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
        preload(match.params.postId);
    }, [])


    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error:"" ,loading: true});
        updatePost(match.params.postId, user._id, token, formData)
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
    }

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to={`/dashboard/${user._id}`}>Admin Home</Link>
        </div>
    )



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
                    options: ['inline', 'blockType', 'list', 'link'],
                    blockType: {
                        inDropdown: false,
                        options: ['Normal','Blockquote'],
                    },
                 }}

             />
         )
    }

    return (
        <div className="container bg-info p-4">
            <h1 className="text-white text-center">Update Post</h1>
            {goBack()}

            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2 ">
                    {successMessage()}
                    {errorMessage()}

                    <form>
                        <span>Update Photo</span>
                        <div className="form-group">
                            <label className="btn btn-block btn-success">
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

                        <button className="btn btn-outline-success mb-3" type="submit" onClick={onSubmit}>Update Post</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default UpdatePost;
