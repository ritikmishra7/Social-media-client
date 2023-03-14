import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Button, Divider, IconButton, Popover, TextField, Tooltip, Typography } from '@mui/material'
import { RiSettings2Line } from 'react-icons/ri';
import profileImg from '../../assets/default-profile-pic.jpg'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteAccount, settoastData, updateUserProfile } from '../../internal';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Notfound from '../../pages/Notfound/Notfound';
import Userposts from './Userposts';
import "./Profile.css"
import { axiosClient } from '../../utils/axiosClient';
import { ACCESS_TOKEN_KEY, removeItem } from '../../utils/localStorageManager';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'white'
};

function Profile() {

    const dispatch = useDispatch();
    const myProfile = useSelector(state => state.appConfigReducer?.myProfile);

    const navigate = useNavigate();

    const [name, setname] = useState('');
    const [bio, setbio] = useState('');
    const [username, setusername] = useState('');
    const [avatar, setavatar] = useState('');
    const [email, setemail] = useState('');
    const [changeProfile, setChangeProfile] = useState(false);
    const [open, setOpen] = useState(false);

    const imageRef = useRef(null);

    const { userId } = useParams();
    const loggedUserId = myProfile?._id;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEdit = (e) => {
        e.preventDefault();
        try {
            dispatch(settoastData({ type: 'info', message: 'Updating Profile...' }));
            dispatch(updateUserProfile({
                name,
                bio,
                username,
                email
            }))
            dispatch(settoastData({ type: 'success', message: 'Profile Updated Successfully' }));
            handleClose();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        setname(myProfile?.name || '');
        setbio(myProfile?.bio || '');
        setusername(myProfile?.username || '');
        setemail(myProfile?.email || '');
        setavatar(myProfile?.avatar?.url || '');
    }, [myProfile])

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (!file) return;
        setChangeProfile(true);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = function (e) {
            setavatar(fileReader.result);
        }
    }

    function handleChangeProfilePic(e) {
        e.preventDefault();
        imageRef.current.click();
    }

    const handlesaveProfilePic = async (e) => {
        e.preventDefault();
        try {
            dispatch(settoastData({ type: 'info', message: 'Updating Profile Image...' }));
            dispatch(updateUserProfile({
                avatar
            }));
            setChangeProfile(false);
            dispatch(settoastData({ type: 'success', message: 'Image Updated Successfully' }));
            handleClose();
        } catch (error) {
            // console.log(error);
        }
    }

    // For Delete account
    const [anchorEl, setAnchorEl] = useState(null);

    const handleDeleteClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDeleteClose = () => {
        setAnchorEl(null);
    };

    const Deleteopen = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    async function handleDelete(e) {
        e.preventDefault();
        try {
            dispatch(settoastData({ type: 'info', message: 'Deleting Account...' }));
            dispatch(DeleteAccount());
            const logout = await axiosClient.post('/auth/logout');
            removeItem(ACCESS_TOKEN_KEY);
            if (logout.status === 'ok')
                dispatch(settoastData({ type: 'success', message: 'Account Deleted Successfully' }));
            navigate('/auth/login');
            handleDeleteClose();
        } catch (error) {

        }
    }

    if (userId === loggedUserId) {
        return (
            <ThemeProvider theme={darkTheme}>
                <div className='profile-section'>
                    <div className="info-section">
                        <Tooltip title="Change Profile Picture" arrow>
                            <div className="avatar-section">
                                <label htmlFor="userImg" className='labelImg'>
                                    <Avatar src={avatar ? avatar : profileImg} alt="Profile" className='avatar' sx={{ width: 150, height: 150 }} />
                                </label>
                                <input id='userImg' type="file"
                                    accept='image/*' onChange={handleImageChange} className="inputImg" ref={imageRef} />
                                {changeProfile ? <Button variant="contained" size="small" sx={{ color: 'black', backgroundColor: '#42a5f5', fontWeight: '600', marginTop: 3, ':hover': { bgcolor: '#90caf9', color: 'black', } }} onClick={handlesaveProfilePic}>
                                    Save Profile Picture
                                </Button> : <Button variant="contained" size="small" sx={{ color: 'black', backgroundColor: '#42a5f5', fontWeight: '600', marginTop: 3, ':hover': { bgcolor: '#90caf9', color: 'black', } }} onClick={handleChangeProfilePic}>
                                    Change Profile Picture
                                </Button>}

                            </div>
                        </Tooltip>
                        <div className="bio-section">
                            <div className="bio-header">
                                <Typography variant="h6">
                                    {myProfile?.username}
                                </Typography>
                                <Button variant="contained" size="small" sx={{ color: 'black', backgroundColor: 'white', fontWeight: '600', ':hover': { bgcolor: '#cfcfcf', color: 'black', } }} onClick={handleOpen}>
                                    Edit Profile
                                </Button>
                                {/* Update profile modal here */}
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            Update Profile
                                        </Typography>
                                        <Box id="modal-modal-description" sx={{ mt: 2 }}>
                                            <TextField id="standard-basic" label="Name" variant="outlined" value={name} onChange={(event) => {
                                                setname(event.target.value);
                                            }} margin="normal" fullWidth />
                                            <TextField id="standard-basic" label="Email" variant="outlined" value={email} onChange={(event) => {
                                                setemail(event.target.value);
                                            }} margin="normal" fullWidth />
                                            <TextField id="standard-basic" label="Username" variant="outlined" value={username} onChange={(event) => {
                                                setusername(event.target.value);
                                            }} margin="normal" fullWidth />
                                            <TextField id="standard-basic" label="Bio" variant="outlined" value={bio} onChange={(event) => {
                                                setbio(event.target.value);
                                            }} margin="normal" fullWidth multiline rows={4} />
                                            <Button variant="contained" size="medium" sx={{ color: 'black', backgroundColor: 'white', fontWeight: '500', ':hover': { bgcolor: '#cfcfcf', color: 'black', } }} onClick={handleEdit}>
                                                Save Changes
                                            </Button>
                                        </Box>
                                    </Box>
                                </Modal>
                                <IconButton aria-label='settings' onClick={handleDeleteClick}>
                                    <RiSettings2Line />
                                </IconButton>
                                <Popover
                                    id={id}
                                    open={Deleteopen}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    onClose={() => { setAnchorEl(null) }}
                                >
                                    <Button variant="contained" size="small" sx={{ color: 'black', backgroundColor: 'red', fontWeight: '600', ':hover': { bgcolor: '#fc3d3d', color: 'black', } }} onClick={handleDelete}>
                                        Delete Account
                                    </Button>
                                </Popover>

                            </div>
                            <div className="bio-info">
                                <Typography variant="h6">
                                    {myProfile?.posts?.length} posts
                                </Typography>
                                <Typography variant="h6">
                                    <Link to='/users/followers' style={{ textDecoration: 'none', color: 'inherit' }}>{myProfile?.followers?.length} followers</Link>
                                </Typography>
                                <Typography variant="h6">
                                    <Link to='/users/followings' style={{ textDecoration: 'none', color: 'inherit' }}>{myProfile?.followings?.length} following</Link>
                                </Typography>
                            </div>
                            <div className="bio-footer">
                                <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
                                    {myProfile?.name}
                                </Typography>
                                {myProfile?.bio ? <Typography variant="subtitle1">
                                    {myProfile?.bio}
                                </Typography> : <Typography variant="subtitle1">
                                    No Bio added
                                </Typography>}
                            </div>

                        </div>
                    </div>
                    <Divider />
                    <div className="posts-section">
                        <Userposts />
                    </div>

                </div>
            </ThemeProvider >
        )
    }
    else {
        return (<Notfound />)
    }

}

export default Profile