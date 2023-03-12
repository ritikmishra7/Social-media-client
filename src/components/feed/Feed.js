import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Button, createTheme, TextField, ThemeProvider, Tooltip } from '@mui/material';
import { CreateNewPost } from '../../internal';
import { getFeed } from '../../internal';
import Nopostavailable from '../Nopostavailable/Nopostavailable';
import { BiImage } from 'react-icons/bi';
import Suggestions from '../Suggestions/Suggestions';
import Post from '../../components/Post';


function Feed() {

    const dispatch = useDispatch();
    const feedData = useSelector(state => state?.feedReducer?.feedData);
    const [posts, setposts] = useState([]);

    const [caption, setcaption] = useState('')
    const [postImg, setpostImg] = useState('');
    const imageRef = useRef(null);

    async function handleAddpost(e) {
        e.preventDefault();
        try {
            // dispatch(settoastData({ type: 'info', message: 'Creating Post...' }));
            dispatch(CreateNewPost({ caption, postImg }));
            setcaption('');
            setpostImg('')
            // dispatch(settoastData({ type: 'success', message: 'Post Created Successfully' }));
        } catch (error) {
            console.log(error);
            // dispatch(settoastData({ type: 'error', message: e }));
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

    useEffect(() => {
        dispatch(getFeed());
    }, [dispatch]);

    useEffect(() => {
        setposts(feedData?.posts);
    }, [feedData])

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <div className="main-section">
            <div className="add-post-section center-thing">
                <ThemeProvider theme={darkTheme}>
                    <Box sx={{ width: '100%', padding: '20px', bgcolor: 'rgb(39,39,39)', borderRadius: '16px' }}>
                        <TextField id="standard-basic" label="What's on your mind?" variant="outlined" value={caption} onChange={(event) => {
                            setcaption(event.target.value)
                        }} margin="normal" fullWidth multiline rows={2} />
                        {postImg && <img src={postImg} alt="Profile" className='postImg' />}
                        {postImg && <Button variant="contained" size="small" sx={{ color: 'white', alignSelf: 'flex-start', backgroundColor: '#c70000', fontWeight: '500', ':hover': { bgcolor: '#e82020', color: 'white' } }} onClick={() => { setpostImg('') }}>
                            Remove Image
                        </Button>}
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
                </ThemeProvider>
            </div>
            <div className='posts center-thing'>
                {feedData?.posts?.length ? feedData?.posts?.map((post) => { return <Post post={post} key={post._id} /> }) :
                    <Nopostavailable />
                }

            </div>
            <Suggestions suggestions={feedData?.Suggestions} />
        </div>
    )
}

export default Feed

