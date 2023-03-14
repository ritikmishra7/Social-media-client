import React, { useState } from 'react'
import { Avatar, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import profileImg from '../../assets/default-profile-pic.jpg';
import { FollowUser, settoastData } from '../../internal';

function Singlesuggestionaccount({ suggestion }) {

    const dispatch = useDispatch();
    const [following, setFollowing] = useState(false);
    const navigate = useNavigate();

    const handleFollow = (e) => {
        e.preventDefault();
        try {
            dispatch(settoastData({ type: 'info', message: 'Following/Unfollowing User...' }));
            setFollowing(true);
            dispatch(FollowUser({ userIdToFollow: suggestion._id }))
            dispatch(settoastData({ type: 'success', message: 'Followed/Unfollowed Successfully' }));
        } catch (error) {

        }
    }

    return (
        <div className="suggestion-account">
            <div className="suggestion-account-left-side" onClick={() => { navigate(`/userProfile/${suggestion?._id}`) }}>
                {/* <img src={suggestion?.avatar?.url ? suggestion?.avatar?.url : profileImg} alt="profile-pic" className='storyImg-box' /> */}
                <Avatar
                    alt="profile-pic"
                    src={suggestion?.avatar?.url ? suggestion?.avatar?.url : profileImg}
                    sx={{ width: 56, height: 56 }}
                />
                <div className="suggestion-account-info">
                    <p>{suggestion?.name}</p>
                    <p className='followed-by'>{suggestion?.username}</p>
                </div>
            </div>
            <div className="follow-btn">
                {following ? <Button variant="contained" size="small" sx={{ color: 'black', backgroundColor: 'white', fontWeight: '600', ':hover': { bgcolor: '#cfcfcf', color: 'black', } }}>
                    Following
                </Button> :
                    <Button variant="contained" size="small" sx={{ color: 'black', backgroundColor: '#42a5f5', fontWeight: '600', ':hover': { bgcolor: '#90caf9', color: 'black', } }} onClick={handleFollow}>
                        Follow
                    </Button>}
            </div>
        </div>
    )
}

export default Singlesuggestionaccount