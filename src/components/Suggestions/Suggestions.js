import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import profileImg from '../../assets/default-profile-pic.jpg';
import Singlesuggestionaccount from './Singlesuggestionaccount';
import './Suggestions.css'
function Suggestions({ suggestions }) {

    const myProfile = useSelector(state => state.appConfigReducer?.myProfile);
    const [name, setname] = useState('')
    const [username, setusername] = useState('')
    const [avatar, setavatar] = useState('')
    const [suggestionsavailable, setsuggestionsavailable] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {

        setname(myProfile?.name || '');
        setusername(myProfile?.username || '');
        setavatar(myProfile?.avatar?.url || '');

    }, [myProfile])

    useEffect(() => {
        if (suggestions?.length > 0) {
            setsuggestionsavailable(true);
        }   // eslint-disable-next-line
    }, [suggestions])


    return (
        <div className="suggestion-section">
            <div className='switch-account'>
                <div className="left-section" onClick={(e) => { navigate(`/profile/${myProfile?._id}`) }}>
                    <Avatar
                        alt="Remy Sharp"
                        src={avatar ? avatar : profileImg}
                        sx={{ width: 56, height: 56 }}
                    />
                    <div className="account-info">
                        <p className='suggestion-username'>
                            {username}
                        </p>
                        <p>{name}</p>
                    </div>
                </div>
            </div>

            <div className='accounts-to-follow'>
                <div className="to-follow-header">
                    <p className='suggestion-writing'>Suggestions for you</p>
                    <p className='see-all-btn'>See All</p>
                </div>
                {suggestionsavailable ? suggestions?.map((suggestion) => { return <Singlesuggestionaccount suggestion={suggestion} key={suggestion._id} /> }) : <p className='no-suggestions'>No suggestions available</p>}
            </div>
        </div>
    )
}

export default Suggestions
