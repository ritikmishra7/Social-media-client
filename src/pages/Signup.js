import React, { useState } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../utils/axiosClient';
import { createTheme, IconButton, InputAdornment, TextField, ThemeProvider } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';
const UsernameGenerator = require('username-generator');


function Signup() {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');


    //FOR EYE ICON OF PASSWORD
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleClickShowCPassword = () => setShowCPassword(!showCPassword);
    const handleMouseDownCPassword = () => setShowCPassword(!showCPassword);

    // FOR RESULT AND SHOWING ERROR
    const [errorflags, setErrorflags] = useState({
        email: false,
        name: false,
        username: false,
        password: false,
        cpassword: false
    });

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            toast.dismiss();
            await toast.promise(
                axiosClient.post('/auth/signup', {
                    email, name, username, password, cpassword
                }),
                {
                    pending: {
                        render() {
                            return "Signing Up"
                        },
                        icon: false,
                    },
                    success: {
                        render({ data }) {
                            return "You are successfully signed up!"
                        },
                        // other options
                        icon: "🟢",
                    },
                    error: {
                        render({ data }) {
                            // When the promise reject, data will contains the error
                            return `${data}`
                        },
                    }
                }
            );

        } catch (e) {
            if (e === 'All fields are required') {
                setErrorflags({
                    email: true,
                    name: true,
                    username: true,
                    password: true,
                    cpassword: true
                });
            }
            else if (e === 'Email is required') {
                setErrorflags({
                    email: true,
                    name: false,
                    username: false,
                    password: false,
                    cpassword: false
                });
            }
            else if (e === 'Name is required') {
                const newerrorObj = {
                    email: false,
                    name: true,
                    username: false,
                    password: false,
                    cpassword: false
                };
                setErrorflags(newerrorObj);
            }
            else if (e === 'Username is required') {
                setErrorflags({
                    email: false,
                    name: false,
                    username: true,
                    password: false,
                    cpassword: false
                });
            }
            else if (e === 'Password is required') {
                setErrorflags({
                    email: false,
                    name: false,
                    username: false,
                    password: true,
                    cpassword: false
                });
            }
            else if (e === 'Confirm Password is required') {
                setErrorflags({
                    email: false,
                    name: false,
                    username: false,
                    password: false,
                    cpassword: true
                });
            }
            else if (e === 'Both the passwords should match') {
                setErrorflags({
                    email: false,
                    name: false,
                    username: false,
                    password: true,
                    cpassword: true
                });
            }
            else if (e === 'Email is already registered') {
                setErrorflags({
                    email: true,
                    name: false,
                    username: false,
                    password: true,
                    cpassword: true
                });
            }
            else if (e === 'Username is already registered') {
                setErrorflags({
                    email: false,
                    name: false,
                    username: true,
                    password: false,
                    cpassword: false
                });
            }
        }
    }

    const newName = name.replace(' ', '_');
    const randomUsername = UsernameGenerator.generateUsername(newName).slice(0, 24);
    return (
        <ThemeProvider theme={darkTheme}>
            <div className="sign-up center-thing">
                <div className='signup-wrapper'>
                    <p className='my-logo'>Social Media</p>
                    <p className='logo-message'>Sign up to see photos and videos from your friends.</p>
                    <form className='signup-form' onSubmit={handleSubmit}>
                        <p className='try-username'>Try username: <span className='suggested-username' onClick={() => setUsername(randomUsername)}>{randomUsername}</span></p>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={errorflags.email}
                        />
                        <TextField
                            fullWidth
                            label="Full Name"
                            type="text"
                            value={name} onChange={(e) => setName(e.target.value)}
                            autoComplete='off'
                            error={errorflags.name}
                        />
                        <TextField
                            fullWidth
                            label="Username"
                            type="text"
                            value={username} onChange={(e) => setUsername(e.target.value)}
                            autoComplete='off'
                            error={errorflags.username}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            error={errorflags.password}
                        />
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type={showCPassword ? "text" : "password"}
                            value={cpassword}
                            onChange={(e) => setCpassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowCPassword}
                                            onMouseDown={handleMouseDownCPassword}
                                        >
                                            {showCPassword ? <MdVisibility /> : <MdVisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            error={errorflags.cpassword}
                        />
                        <p className='terms1'>People who use our service may have uploaded your contact information to our Website.</p>
                        <p className='terms2'>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy.</p>
                        <button type='submit' className='sign-up-submit' onClick={handleSubmit}>Sign up</button>
                    </form>
                </div>
                <div className="already-account">
                    <p>Have an account? <span className='log-in' onClick={() => navigate('/auth/login')}>Log in</span></p>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={false}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </div>
        </ThemeProvider>
    )
}

export default Signup