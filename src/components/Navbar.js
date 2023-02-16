import React from 'react'
import './Navbar.css'
import { AiFillHome, AiOutlineSearch, AiOutlineMessage, AiOutlineHeart, AiOutlinePlusSquare, AiOutlineMenu, AiOutlineInstagram } from 'react-icons/ai';
import { MdOutlineExplore } from 'react-icons/md'
import { BsFillCollectionPlayFill } from 'react-icons/bs'
import profilePic from '../assets/default-profile-pic.jpg'





function navbar() {

    return (
        <div className='navContainer'>
            <h3 className='my-logo hideThis'>Social Media</h3>
            <div className='logo showThis'>
                <AiOutlineInstagram size={40} />
            </div>
            <div className='Allnav-icons'>
                <div className='navIcon-box'>
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
                    <AiOutlineHeart size={30} />
                    <p className='hideThis'>Notifications</p>
                </div>
                <div className='navIcon-box'>
                    <AiOutlinePlusSquare size={30} />
                    <p className='hideThis'>Create</p>
                </div>
                <div className='navIcon-box'>
                    <div>
                        <img src={profilePic} alt="profile-pic" className='profileImg-box' />
                    </div>
                    <p className='hideThis'>Profile</p>
                </div>
            </div>
            <div className='navIcon-box more'>
                <AiOutlineMenu size={30} />
                <p className='hideThis'>More</p>
            </div>

        </div>
    )
}

export default navbar