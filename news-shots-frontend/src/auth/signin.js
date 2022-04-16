import React, {useState} from 'react'
import {Redirect} from 'react-router-dom';

import {signin, authenticate, isAuth} from './authAPICalls';

const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        didRedirect: false
    });

    const {email, password, error, loading, didRedirect} = values;

    const {user} = isAuth();

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const performRedirect = () => {
        if(didRedirect || isAuth()){
            return <Redirect to={`/dashboard/${user._id}`}/>
        }
    }

    const loadingMessage = () => {
        return (
            loading && (
                <div className="row">
                  <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-info" style={{ display: loading ? '' : 'none' }} >
                        <h2>Loading...</h2>
                    </div>
                  </div>
                </div>
            )
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
        setValues({...values, error: false, loading: true})
        signin({email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, loading: false});
            }
            else{
                authenticate(data, ()=>{
                    setValues({...values,
                        email: "",
                        password: "",
                        error: "",
                        didRedirect: true
                    });
                })
            }
        })

    }

    return (
        <div>
            <h1 className="text-center mt-5 mb-5">Sign In</h1>

            {loadingMessage()}
            {errorMessage()}
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
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
            {performRedirect()}
        </div>
    );
};

export default Signin;
