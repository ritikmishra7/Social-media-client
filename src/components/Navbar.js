import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { AiFillHome, AiOutlineSearch, AiOutlineMessage, AiOutlinePlusSquare, AiOutlineMenu, AiOutlineInstagram, AiOutlineLogout } from 'react-icons/ai';
import { MdOutlineExplore } from 'react-icons/md'
import { BsFillCollectionPlayFill } from 'react-icons/bs'
import profilePic from '../assets/default-profile-pic.jpg'
import useWindowDimensions from '../utils/customHooks/useWindowDimensions';
import Topbar from './TopMobileAppBar/Topbar';
import BottomAppBar from './BottomMobileAppBar/Bottombar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../utils/axiosClient';
import { searchUser, settoastData } from '../internal';
import { ACCESS_TOKEN_KEY, removeItem } from '../utils/localStorageManager';
import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, InputAdornment, Modal, TextField, Typography } from '@mui/material';
import Singlesuggestionaccount from './Suggestions/Singlesuggestionaccount';




function Navbar() {

    const { width } = useWindowDimensions();
    const [topNav, setTopNav] = useState(false);
    const [avatar, setavatar] = useState(false);
    const myProfile = useSelector(state => state.appConfigReducer?.myProfile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        width <= 766 ? setTopNav(true) : setTopNav(false);
    }, [width])

    useEffect(() => {
        setavatar(myProfile?.avatar?.url || '');
    }, [myProfile])

    function handleProfileOpen(e) {
        e.preventDefault();
        navigate(`/profile/${myProfile?._id}`);
    }

    async function handleLogout(e) {
        e.preventDefault();

        try {
            dispatch(settoastData({ type: 'info', message: 'Logging out...' }))
            await axiosClient.post('/auth/logout');
            removeItem(ACCESS_TOKEN_KEY);
            dispatch(settoastData({ type: 'success', message: 'Logged out successfully' }))
            navigate('/auth/login');
        } catch (error) {

        }
    }

    // SEARCH MODAL

    const [searchQuery, setsearchQuery] = useState('');

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const style = {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'rgb(39,39,39)',
        border: '2px solid #000',
        boxShadow: 24,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: '10px',

    };

    const searchResults = useSelector(state => state?.appConfigReducer?.searchResults);
    const [results, setresults] = useState([]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            dispatch(searchUser({ searchQuery }));
        }
    }, [searchQuery, dispatch])

    useEffect(() => {
        setresults(searchResults);
    }, [searchResults])



    return (
        topNav ? <>
            <Topbar />
            <BottomAppBar />
        </> :
            <ThemeProvider theme={darkTheme}>
                <div className='navContainer'>
                    <h3 className='my-logo hideThis'>Social Sphere</h3>
                    <div className='logo showThis'>
                        <AiOutlineInstagram size={40} />
                    </div>
                    <div className='Allnav-icons'>
                        <div className='navIcon-box' onClick={() => { navigate('/') }}>
                            <AiFillHome size={30} />
                            <p className='hideThis'>Home</p>
                        </div>
                        <div className='navIcon-box' onClick={handleOpen}>
                            <AiOutlineSearch size={30} />
                            <p className='hideThis'>Search</p>
                        </div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="Search"
                            aria-describedby="Type a name for user to search"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ alignSelf: 'center' }}>
                                    Search For User
                                </Typography>
                                <Box sx={{ display: 'flex', gap: '20px' }}>
                                    <TextField id="standard-basic" variant="outlined" value={searchQuery} onChange={(e) => setsearchQuery(e.target.value)}
                                        margin="normal" fullWidth placeholder='Search...' InputProps={{
                                            startAdornment: <InputAdornment position="start">
                                                <AiOutlineSearch size={25} />
                                            </InputAdornment>,
                                        }} />
                                </Box>

                                {/* <Popper id={id} open={openPopper} anchorEl={anchorEl} sx={{ zIndex: 1 }}> */}
                                <Box sx={{ border: 1, p: 2, bgcolor: 'rgb(39,39,39)', marginTop: '20px' }}>
                                    {results?.length ? searchResults?.map((result) => {
                                        return <Singlesuggestionaccount key={result?._id} suggestion={result} closed={handleClose} />
                                    }) : <div className="no-results">
                                        <Typography variant="h6" color="white">No Results Found</Typography>
                                    </div>
                                    }
                                </Box>
                                {/* </Popper> */}
                            </Box>
                        </Modal>
                        <div className='navIcon-box'>
                            <MdOutlineExplore size={30} />
                            <p className='hideThis'>Explore</p>
                        </div>
                        <div className='navIcon-box'>
                            <BsFillCollectionPlayFill size={30} />
                            <p className='hideThis'>Reels</p>
                        </div>
                        <div className='navIcon-box'>
                            <AiOutlineMessage size={30} />
                            <p className='hideThis'>Messages</p>
                        </div>
                        <div className='navIcon-box'>
                            <AiOutlinePlusSquare size={30} />
                            <p className='hideThis'>Create</p>
                        </div>
                        <div className='navIcon-box' onClick={handleProfileOpen}>
                            <div>
                                <img src={avatar ? avatar : profilePic} alt="profile" className='profileImg-box' />
                            </div>
                            <p className='hideThis'>Profile</p>
                        </div>
                        <div className='navIcon-box' onClick={handleLogout}>
                            <AiOutlineLogout size={30} />
                            <p className='hideThis'>Logout</p>
                        </div>
                    </div>
                    <div className='navIcon-box more'>
                        <AiOutlineMenu size={30} />
                        <p className='hideThis'>More</p>
                    </div>
                </div>
            </ThemeProvider >
    )
}

export default Navbar;