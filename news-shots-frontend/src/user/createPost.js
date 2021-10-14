import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {createPost} from './helper/postAPICalls';
import {getAllCategories} from './helper/categoryAPICalls';
import {isAuth} from '../auth/authAPICalls'

const CreatePost = () => {

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

    const {title, description, content, categories, category, author, createdPost, error, formData } = values;
    const {user, token} = isAuth();

    const preload = () => {
        getAllCategories()
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }
            else{
                setValues({...values, categories: data, formData: new FormData()})
            }
        })
        .catch()
    }

    useEffect(() => {
        preload();
    },[])

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value);

        setValues({...values, [name]: value});
    }

    const successMessage = () => {
        return (
            <div className="alert alert-success mt-3" style={{display: createdPost ? "" : "none"}}>
                <h4>{createdPost} created Successfully</h4>
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

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error:"" ,loading: true});
        createPost(user._id, token, formData)
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

    return (
        <div className="container bg-info p-4">
            <h1 className="text-white text-center">Add new Post</h1>
            {goBack()}

            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2 ">
                    {successMessage()}
                    {errorMessage()}

                    <form>
                        <span>Add Photo</span>
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
                            <textarea className="form-control" type="textarea" placeholder="Content" onChange={handleChange("content")} value={content} />
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

                        <button className="btn btn-outline-success mb-3" type="submit" onClick={onSubmit}>Add Post</button>
                    </form>
                </div>
            </div>
        </div>

    )
}


export default CreatePost;
