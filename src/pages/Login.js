import React from 'react'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {

    const email_numberRef = useRef(null);
    const passRef = useRef(null);
    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        console.log('email or number', email_numberRef.current.value);
        console.log('password', passRef.current.value);
        navigate("/");
    }

    return (
        <div className="sign-up center-thing">
            <div className='signup-wrapper'>
                <p className='my-logo'>Social Media</p>
                <p className='logo-message'>Log in to see photos and videos from your friends.   </p>

                <form className='signup-form' >
                    <input type="text" placeholder='Username or Email' className='email-input' ref={email_numberRef} />
                    <input type="password" placeholder='Password' className='password-input' ref={passRef} />
                    <button type='submit' className='sign-up-submit' onClick={handleSubmit}>Log in</button>
                </form>
            </div>
            <div className="already-account">
                <p>Don't have an account? <span className='log-in' onClick={() => navigate('/auth/signup')}>Sign up</span></p>
            </div>
        </div>
    )
}

export default Login