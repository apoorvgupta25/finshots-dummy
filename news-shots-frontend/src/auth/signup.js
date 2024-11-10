import React, {useState} from 'react'
import {Link} from 'react-router-dom';

import {signup} from './authAPICalls';

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const {name, email, password, error, success} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const successMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div className="alert alert-success" style={{ display: success ? '' : 'none' }} >
                New account was created successfully. Please <Link to="/signin">Login Here</Link>
              </div>
            </div>
          </div>
        );
      };

    const errorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div className="alert alert-danger" style={{ display: error ? '' : 'none' }} >
                {error}
              </div>
            </div>
          </div>
        );
      };

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false})
        signup({name, email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false});
            }
            else{
                setValues({...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                });
            }
        })

    }

    return (
        <div >
            <h1 className="text-center mt-5 mb-5">Sign Up</h1>

            {successMessage()}
            {errorMessage()}
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label>Name</label>
                            <input className="form-control" type="text" onChange={handleChange("name")} value={name}/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input className="form-control" type="email" onChange={handleChange("email")} value={email}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input className="form-control" type="password" onChange={handleChange("password")} value={password}/>
                        </div><br/>
                    <button className="btn btn-success btn-block" onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
