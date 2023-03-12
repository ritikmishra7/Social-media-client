import React from 'react'
import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiSend, FiBookmark } from 'react-icons/fi';
import { BsDot, BsEmojiSmile } from 'react-icons/bs';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import profileImg from '../assets/default-profile-pic.jpg';
import './Post.css'
import { LikeUnlikePost, LikeUnlikeUserPost, LikeUnlikeFeed, settoastData } from '../internal';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Container } from '@mui/material';


function Post({ post }) {

    const [comment, setComment] = useState('');
    const [emojiClick, setEmojipick] = useState(false);
    const dispatch = useDispatch();
    const params = useParams();
    const userId = params.userId;
    const myProfile = useSelector(state => state?.appConfigReducer?.myProfile);

    function handleEmojiCLick(emojiData) {
        const newComment = comment + emojiData.native;
        setComment(newComment);
        setEmojipick(false);
    }

    function handleClickonComment(data) {
        if (emojiClick) {
            setEmojipick(!emojiClick);
        }
    }

    function handleLikeUnlike(e) {
        e.preventDefault();
        try {
            dispatch(settoastData({ type: 'info', message: 'Liking Post...' }));
            if (userId === myProfile?._id) {
                dispatch(LikeUnlikePost({ postId: post._id }));
            }
            else if (userId) {
                dispatch(LikeUnlikeUserPost({ postId: post._id }));
            }
            else {
                dispatch(LikeUnlikeFeed({ postId: post._id }));
            }
            dispatch(settoastData({ type: 'success', message: 'Post Liked/Unliked Successfully' }));
        } catch (error) {

        }


    }

    return (
        <Container className="post-section" sx={{ bgcolor: 'rgb(39,39,39)', marginBlock: '20px', padding: '20px', borderRadius: '16px' }}>
            <div className="post-header">
                <Link to={`/userProfile/${post?.owner?._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Avatar alt="profile-image" src={post?.owner?.avatar?.url ? post?.owner?.avatar?.url : profileImg} />

                </Link>
                <div className="username" >
                    <Link to={`/userProfile/${post?.owner?._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className='hover-grey'>{post?.owner?.name}</div>
                    </Link>
                    <BsDot />
                    <Link to={`/userProfile/${post?.owner?._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className='hover-grey'>{post?.owner?.username}</div>
                    </Link>
                </div>
            </div>
            <div className="content">
                {post?.image?.url ? <img src={post?.image?.url} alt="post-img" className='post-img' /> : <div className="caption-section caption-without-image">
                    <div>{post?.caption}</div>
                </div>}
            </div>
            <div className="post-footer">
                <div className="post-datas">
                    <div className="post-likes">
                        {post?.isLiked ? <AiFillHeart size={25} style={{ color: 'red' }} className='pointer-icon' onClick={handleLikeUnlike} /> : <AiOutlineHeart size={25} className='pointer-icon' onClick={handleLikeUnlike} />}
                        <FaRegComment size={25} className='pointer-icon' />
                        <FiSend size={25} className='pointer-icon' />
                    </div>
                    <FiBookmark size={25} className='pointer-icon' />
                </div>
                <div>{post?.likesCount} Likes</div>
                {post?.image?.url ? <div className="caption-section">
                    <div>{post?.caption}</div>
                </div> : <></>}
                <div className="comment-box">
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} className='comment-input' placeholder='Add a comment...' onClick={handleClickonComment} />
                    <BsEmojiSmile className='emoji-Icon' onClick={(e) => setEmojipick(!emojiClick)} />
                    {emojiClick && <div className='emoji-picker-container'><Picker previewPosition='none' data={data} onEmojiSelect={handleEmojiCLick} /></div>}
                </div>
                <p className='time-ago'>{post?.timeAgo}</p>
            </div>
        </Container>
    )
}
export default Post



