import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../utils/axiosClient';
import { ACCESS_TOKEN_KEY, setItem } from '../utils/localStorageManager';
import TextField from '@mui/material/TextField';
import './Login.css';
import { InputAdornment, IconButton, createTheme, ThemeProvider } from '@mui/material';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { settoastData } from '../internal';

function Login() {


    const [email_username, setEmail_Username] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // FOR PASSWORD EYE ICON
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    //FOR ERRORS
    const [errorflags, setErrorflags] = useState({
        email_username: false,
        password: false
    });

    const dispatch = useDispatch();
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            dispatch(settoastData({ type: 'info', message: 'Logging in...' }));
            const reply = await axiosClient.post('/auth/login', {
                email_username, password
            });
            setItem(ACCESS_TOKEN_KEY, reply.result.accessToken);
            dispatch(settoastData({ type: 'success', message: 'Logged in successfully' }));
            navigate('/');
        } catch (e) {
            if (e === 'All fields are required') {
                setErrorflags({
                    email_username: true,
                    password: true,
                });
            }
            else if (e === 'Email or Username is required' || e === 'User is not registered') {
                setErrorflags({
                    email_username: true,
                    password: false,
                });
            }
            else if (e === 'Password is required' || e === 'Incorrect Password') {
                setErrorflags({
                    email_username: false,
                    password: true,
                });
            }
        }
    }
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="sign-up center-thing">
                <div className='signup-wrapper'>
                    <p className='my-logo'>Social Sphere</p>
                    <p className='logo-message'>Log in to see photos and videos from your friends.   </p>

                    <form className='signup-form' onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Email or Username"
                            type="email"
                            value={email_username}
                            onChange={(e) => setEmail_Username(e.target.value)}
                            error={errorflags.email_username}
                        />
                        <TextField
                            fullWidth
                            id="outlined-password-input"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
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
                        <button type='submit' className='sign-up-submit' onClick={handleSubmit}>Log in</button>
                    </form>
                </div>
                <div className="already-account">
                    <p>Don't have an account? <span className='log-in' onClick={() => navigate('/auth/signup')}>Sign up</span></p>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Login