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
import { settoastData } from '../internal';
import { ACCESS_TOKEN_KEY, removeItem } from '../utils/localStorageManager';




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


    return (
        topNav ? <>
            <Topbar />
            <BottomAppBar />
        </> :
            <div className='navContainer'>
                <h3 className='my-logo hideThis'>Social Media</h3>
                <div className='logo showThis'>
                    <AiOutlineInstagram size={40} />
                </div>
                <div className='Allnav-icons'>
                    <div className='navIcon-box' onClick={() => { navigate('/') }}>
                        <AiFillHome size={30} />
                        <p className='hideThis'>Home</p>
                    </div>
                    <div className='navIcon-box'>
                        <AiOutlineSearch size={30} />
                        <p className='hideThis'>Search</p>
                    </div>
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
    )
}

export default Navbar