import { Button, createTheme, Divider, IconButton, ThemeProvider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import profileImg from '../../assets/default-profile-pic.jpg'
import "./Userprofile.css"
import { FollowUnfollow, getUserProfile } from '../../internal';
import { RiSettings2Line } from 'react-icons/ri';
import Otheruserposts from './Otheruserposts';




function Userprofile() {

    const [name, setname] = useState('');
    const [bio, setbio] = useState(false);
    const [username, setusername] = useState('');
    const [avatar, setavatar] = useState('');
    const myProfile = useSelector(state => state?.appConfigReducer?.myProfile);
    const userProfile = useSelector(state => state?.userProfileReducer?.userProfile);
    const dispatch = useDispatch();
    const { userId } = useParams();

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    useEffect(() => {
        dispatch(getUserProfile({ userId }));
    }, [dispatch, userId]);
    const navigate = useNavigate();


    useEffect(() => {
        if (myProfile?._id === userId) {
            navigate(`/profile/${myProfile?._id}`);
        }
    }, [myProfile, userId, navigate]);

    useEffect(() => {
        setname(userProfile?.name || '');
        setbio(userProfile?.bio || '');
        setusername(userProfile?.username || '');
        setavatar(userProfile?.avatar?.url || '');
    }, [userProfile, myProfile]);

    async function handleFollowUnfollow() {
        try {
            const userIdToFollow = userProfile?._id;
            dispatch(FollowUnfollow({ userIdToFollow }));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <div className='user-profile-section'>
                <div className="user-info-section">
                    <div className="user-avatar-section">
                        <img src={avatar ? avatar : profileImg} alt="Profile" className='user-avatar' />
                    </div>

                    <div className="user-bio-section">
                        <div className="user-bio-header">
                            <Typography variant="h6">
                                {username}
                            </Typography>
                            {userProfile?.isFollowing ? <Button variant="contained" size="small" sx={{ color: 'black', backgroundColor: 'white', fontWeight: '600', ':hover': { bgcolor: '#cfcfcf', color: 'black', } }} onClick={handleFollowUnfollow}>Following</Button> : <Button variant="contained" size="small" sx={{ color: 'white', backgroundColor: '#42a5f5', fontWeight: '600', ':hover': { bgcolor: '#90caf9', color: 'white', } }} onClick={handleFollowUnfollow}>Follow</Button>}
                            <IconButton aria-label='settings'>
                                <RiSettings2Line />
                            </IconButton>
                        </div>
                        <div className="user-bio-info">
                            <Typography variant="h6">
                                {userProfile?.posts?.length} posts
                            </Typography>
                            <Typography variant="h6">
                                <Link to='/users/followers' style={{ textDecoration: 'none', color: 'inherit' }}>{userProfile?.followers?.length || '0'} followers</Link>
                            </Typography>
                            <Typography variant="h6">
                                <Link to='/users/followings' style={{ textDecoration: 'none', color: 'inherit' }}>{userProfile?.following?.length || '0'} following</Link>
                            </Typography>
                        </div>
                        <div className="user-bio-footer">
                            <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
                                {name}
                            </Typography>
                            {bio ? <Typography variant="subtitle1">
                                {bio}
                            </Typography> : <Typography variant="subtitle1">
                                No Bio added
                            </Typography>}
                        </div>

                    </div>
                </div>
                <Divider />
                <div className="user-posts-section">
                    <Otheruserposts />
                </div>

            </div>
        </ThemeProvider >
    )
}

export default Userprofile;