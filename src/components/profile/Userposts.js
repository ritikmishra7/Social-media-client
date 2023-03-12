import React, { useEffect, useState, useRef } from 'react'
import { AiOutlineCamera } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Button, Divider, Modal, TextField, Tooltip, Typography } from '@mui/material'
import { BiImage } from 'react-icons/bi'
import './Userposts.css'
import { CreateNewPost } from '../../internal';
import Post from '../Post';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

function Userposts() {


    const [userPosts, setuserposts] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const dispatch = useDispatch();
    const handleClose = () => {
        setcaption('');
        setpostImg('');
        setOpen(false);
    }
    const [caption, setcaption] = useState('')
    const [postImg, setpostImg] = useState('');
    const imageRef = useRef(null);

    async function handleAddpost(e) {
        e.preventDefault();
        try {
            dispatch(CreateNewPost({ caption, postImg }));
            setcaption('');
            setpostImg('')
        } catch (error) {
            console.log(error);
        }
    }

    function handleImageChange(e) {
        e.preventDefault();
        const file = e.target.files[0];
        e.target.value = '';
        if (!file) return;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = function (e) {
            setpostImg(fileReader.result);
        }
    }

    const myProfile = useSelector(state => state.appConfigReducer?.myProfile);

    useEffect(() => {
        setuserposts(myProfile?.posts);
    }, [myProfile])


    return (
        <div className='posts center-thing'>
            {userPosts.length ? userPosts?.map(post => <Post key={post._id} post={post} />)

                : <span className="no-posts-wrapper">
                    <span className="no-posts-header">
                        <AiOutlineCamera size={80} color='#dbdbdb' />
                        <span>Share Photos</span>
                    </span>
                    <span className='no-posts-message'>When you share photos, they will appear on your profile.</span>
                    <span>
                        <span>
                            <Button onClick={handleOpen}>Share your first photo</Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="span" >
                                        Create new post
                                    </Typography>
                                    <Divider variant='full width' />
                                    {postImg && <img src={postImg} alt="Profile" className='postImg' />}
                                    {postImg && <Button variant="contained" size="small" sx={{ color: 'white', alignSelf: 'flex-start', backgroundColor: '#c70000', fontWeight: '500', ':hover': { bgcolor: '#e82020', color: 'white' } }} onClick={() => { setpostImg('') }}>
                                        Remove Image
                                    </Button>}
                                    <TextField id="standard-basic" label="What's on your mind?" variant="outlined" value={caption} onChange={(event) => {
                                        setcaption(event.target.value)
                                    }} margin="normal" fullWidth multiline rows={2} />
                                    <div className="icon-and-submit">
                                        <Tooltip title='Add Image' >
                                            <Avatar sx={{ bgcolor: '#90caf9', color: 'white' }}>
                                                <span >
                                                    <label htmlFor="postImg" className='postImg image-picker'>
                                                        <BiImage size={25} />
                                                    </label>
                                                    <input id='postImg' type="file"
                                                        accept='image/*' onChange={handleImageChange} className="inputImg" ref={imageRef} />
                                                </span>
                                            </Avatar>
                                        </Tooltip>
                                        <Button variant="contained" size="small" sx={{ color: 'black', backgroundColor: '#42a5f5', fontWeight: '600', ':hover': { bgcolor: '#90caf9', color: 'black', } }} onClick={handleAddpost}>
                                            Post
                                        </Button>
                                    </div>
                                </Box>
                            </Modal>
                        </span>
                    </span>
                </span>
            }
        </div>
    )
}

export default Userposts