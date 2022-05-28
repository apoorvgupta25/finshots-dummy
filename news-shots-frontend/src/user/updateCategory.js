import {useState, useEffect} from 'react';

import {isAuth} from '../auth/authAPICalls';
import {updateCategory, getCategory} from './helper/categoryAPICalls';

const UpdateCategory = ({categoryName="Business"}) => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user, token} = isAuth();

    const handleChange = event => {
        setError("");
        setName(event.target.value);
    }

    const successMessage = () => {
        if(success){
            return <h4 className="text-success">Category updated Succesefully</h4>
        }
    }

    const warningMessage = () => {
        if(error){
            return <h4 className="text-danger">Failed to Update Category</h4>
        }
    }

    const preload = categoryName => {
        getCategory(categoryName)
        .then(data => {
            if(data.error){
                setError(true)
            }
            else{
                setError("");
                setName(data.name);
            }
        })

    }

    useEffect(() => {
        preload(categoryName);
    // eslint-disable-next-line
    }, [])

    const onSubmit = event => {
        event.preventDefault();
        setError("");
        setSuccess(false);
        updateCategory(categoryName, user._id, token, {name})
        .then(data => {
            if(data.error){
                setError(true)
            }
            else{
                setError("");
                setSuccess(true);
                setName("");
            }
        })
    }


    return (
        <div>
            <div className="container rounded bg-dark p-4" style={{width:"100%"}}>
                <div className="bg-white rounded mx-1">
                    <div className="mx-3 py-2">

                        {successMessage()}
                        {warningMessage()}
                        <form>
                            <div className="form-group py-2 mb-0">
                                <p className="lead">Enter Category Name</p>
                                <input type="text" className="form-control my-3" onChange={handleChange} value={name} autoFocus required placeholder="For Ex. Summer"/>
                                <button className="btn btn-outline-info w-100" onClick={onSubmit}>Update Category</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default UpdateCategory;
