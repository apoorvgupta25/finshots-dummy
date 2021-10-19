import {React, useState, useEffect} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Alert,
} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';

import {confirmSubscriber} from './home/homeAPICalls';

const Subscribe = () => {

    const [email, setEmail] = useState("");
    const [subError, setSubError] = useState(false);
    const [success, setSuccess] = useState(false);

    //Input
    const handleChange = event => {
        setSubError(false);
        setEmail(event.target.value);
    }

    const successMessage = () => {
        if(success){
            return (
                <Alert
                    className="col-sm-10"
                    color="success"
                    style={{ display: success ? '' : 'none' }}
                    isOpen={success}
                    toggle={onDismiss}>
                    Verfication Link sent to email.
                </Alert>
            )
        }
    }

    const onDismiss = () => {
        setSuccess(false);
        setSubError(false)
    }

    const errorMessage = () => {
        if(subError){
            return (
                <Alert
                    className="col-sm-11"
                    color="danger"
                    style={{ display: subError ? '' : 'none' }}
                    isOpen={subError}
                    toggle={onDismiss}
                >
                Invalid Email
                </Alert>
            )
        }
    }

    // onSubmit
    const onSubmit = event => {
        event.preventDefault();
        setSubError(false);
        setSuccess(false);

        let lastAtPos = email.lastIndexOf("@");
        let lastDotPos = email.lastIndexOf(".");

        if (!(
                lastAtPos < lastDotPos &&
                lastAtPos > 0 &&
                email.indexOf("@@") == -1 &&
                lastDotPos > 2 &&
                email.length - lastDotPos > 2
            )
        ) {
            setSubError(true);
        }
        else {
            confirmSubscriber({email})
            .then(data => {
                if(data.error){
                    console.log("Error");
                    setSubError(true)
                }
                else{
                    setSubError(false);
                    setSuccess(true);
                    setEmail("");
                }
            })
            .catch(setSubError(true));
        }
    }

    return (
        <div className="">
            {successMessage()}
            {errorMessage()}
            <form className="mr-5 ">
                <div className="form-group py-2">
                    <input type="email" className="form-control my-3" onChange={handleChange} value={email} autoFocus required placeholder="Enter Email Address"/>
                    <button className="btn btn-outline-info pull-right" onClick={onSubmit}>Subscribe</button>
                </div>
            </form>

        </div>
    )
}

export default Subscribe    ;
