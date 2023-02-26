import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../utils/axiosClient';
import './Signup.css';
const UsernameGenerator = require('username-generator');


function Signup() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
   async function handleSubmit(e) {
        e.preventDefault();
            try {
                const response = await axiosClient.post('/auth/signup', {
                    email,name,username,password,cpassword
                })
        
                console.log(response);
            } catch (e) {
                console.log(e);
            }
    }

    const newName = name.replace(' ', '_');
    const randomUsername = UsernameGenerator.generateUsername(newName);
    return (
        <div className="sign-up center-thing">
            <div className='signup-wrapper'>
                <p className='my-logo'>Social Media</p>
                <p className='logo-message'>Sign up to see photos and videos from your friends.</p>
                <form className='signup-form' onSubmit={handleSubmit}>
                    <p className='try-username'>Try username: <span className='suggested-username' onClick={() => setUsername(randomUsername)}>{randomUsername}</span></p>
                    <input type="text" placeholder='Email' className='email-input' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder='Full Name' className='name-input'  value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder='Username' className='username-input' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder='Password' className='password-input' value={password}
                     onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" placeholder='Confirm Password' className='password-input' value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
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