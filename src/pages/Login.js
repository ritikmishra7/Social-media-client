import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../utils/axiosClient';
import { ACCESS_TOKEN_KEY, setItem } from '../utils/localStorageManager';
import './Login.css';

function Login() {

    const [email_username, setEmail_Username] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const reply = await axiosClient.post('/auth/login', {
                email_username,
                password
            });
            setItem(ACCESS_TOKEN_KEY, reply.result.accessToken);
            navigate('/');
        } catch (error) {
         console.log(error);   
        }
    }

    return (
        <div className="sign-up center-thing">
            <div className='signup-wrapper'>
                <p className='my-logo'>Social Media</p>
                <p className='logo-message'>Log in to see photos and videos from your friends.   </p>

                <form className='signup-form' onSubmit={handleSubmit}>
                    <input type="text" placeholder='Username or Email' className='email-input' value={email_username} onChange={(e) => setEmail_Username(e.target.value)}/>
                    <input type="password" placeholder='Password' className='password-input' value={password} onChange={(e) => setPassword(e.target.value)}/>
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