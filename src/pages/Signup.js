import React, { useState } from 'react'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
const UsernameGenerator = require('username-generator');


function Signup() {

    const email_numberRef = useRef(null);
    const nameRef = useRef(null);
    const usernameRef = useRef(null);
    const passRef = useRef(null);
    const cpassRef = useRef(null);
    const navigate = useNavigate();
    const [Name, setName] = useState('');
    const [userName, setUsername] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
        console.log('email or number', email_numberRef.current.value);
        console.log('name', nameRef.current.value);
        console.log('username', usernameRef.current.value);
        console.log('password', passRef.current.value);
        console.log('password', cpassRef.current.value);
        navigate('/auth/login');
    }

    const newName = Name.replace(' ', '_');
    const randomUsername = UsernameGenerator.generateUsername(newName);
    return (
        <div className="sign-up center-thing">
            <div className='signup-wrapper'>
                <p className='my-logo'>Social Media</p>
                <p className='logo-message'>Sign up to see photos and videos from your friends.</p>
                <form className='signup-form'>
                    <p className='try-username'>Try username: <span className='suggested-username' onClick={() => setUsername(randomUsername)}>{randomUsername}</span></p>
                    <input type="text" placeholder='Email' className='email-input' ref={email_numberRef} />
                    <input type="text" placeholder='Full Name' className='name-input' ref={nameRef} value={Name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder='Username' className='username-input' ref={usernameRef} value={userName} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder='Password' className='password-input' ref={passRef} />
                    <input type="password" placeholder='Confirm Password' className='password-input' ref={cpassRef} />
                    <p className='terms1'>People who use our service may have uploaded your contact information to our Website.</p>
                    <p className='terms2'>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy.</p>
                    <button type='submit' className='sign-up-submit' onClick={handleSubmit}>Sign up</button>
                </form>
            </div>
            <div className="already-account">
                <p>Have an account? <span className='log-in' onClick={() => navigate('/auth/login')}>Log in</span></p>
            </div>
        </div>
    )
}

export default Signup