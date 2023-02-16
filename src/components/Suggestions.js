import React from 'react'
import profileImg from '../assets/default-profile-pic.jpg';
import './Suggestions.css'
function Suggestions() {
    return (
        <div className="suggestion-section">
            <div className='switch-account'>
                <div className="left-section">
                    <img src={profileImg} alt="profile-pic" className='storyImg-box' />
                    <div className="account-info">
                        <p className='suggestion-username'>
                            ritik_username
                        </p>
                        <p>Ritik Mishra</p>
                    </div>
                </div>
                <p className='switch-btn'>Switch</p>
            </div>

            <div className='accounts-to-follow'>
                <div className="to-follow-header">
                    <p className='suggestion-writing'>Suggestions for you</p>
                    <p className='see-all-btn'>See All</p>
                </div>
                <div className="suggestion-account">
                    <div className="suggestion-account-left-side">
                        <img src={profileImg} alt="profile-pic" className='storyImg-box' />
                        <div className="suggestion-account-info">
                            <p>username_username</p>
                            <p className='followed-by'>Followed by username + 1 more</p>
                        </div>
                    </div>
                    <span className='switch-btn'>Follow</span>
                </div>
                <div className="suggestion-account">
                    <div className="suggestion-account-left-side">
                        <img src={profileImg} alt="profile-pic" className='storyImg-box' />
                        <div className="suggestion-account-info">
                            <p>username_username</p>
                            <p className='followed-by'>Followed by username + 1 more</p>
                        </div>
                    </div>
                    <span className='switch-btn'>Follow</span>
                </div>
                <div className="suggestion-account">
                    <div className="suggestion-account-left-side">
                        <img src={profileImg} alt="profile-pic" className='storyImg-box' />
                        <div className="suggestion-account-info">
                            <p>username_username</p>
                            <p className='followed-by'>Followed by username + 1 more</p>
                        </div>
                    </div>
                    <span className='switch-btn'>Follow</span>
                </div>
                <div className="suggestion-account">
                    <div className="suggestion-account-left-side">
                        <img src={profileImg} alt="profile-pic" className='storyImg-box' />
                        <div className="suggestion-account-info">
                            <p>username_username</p>
                            <p className='followed-by'>Followed by username + 1 more</p>
                        </div>
                    </div>
                    <span className='switch-btn'>Follow</span>
                </div>
                <div className="suggestion-account">
                    <div className="suggestion-account-left-side">
                        <img src={profileImg} alt="profile-pic" className='storyImg-box' />
                        <div className="suggestion-account-info">
                            <p>username_username</p>
                            <p className='followed-by'>Followed by username + 1 more</p>
                        </div>
                    </div>
                    <span className='switch-btn'>Follow</span>
                </div>
            </div>
        </div>
    )
}

export default Suggestions