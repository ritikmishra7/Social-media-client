import React from 'react'
import profileImg from '../assets/default-profile-pic.jpg';
import './Story.css';
function Story() {
    return (
        <div className="single-story">
            <img src={profileImg} alt="profile-pic" className='storyImg-box' />
            <p>Ritik</p>
        </div>
    )
}

export default Story