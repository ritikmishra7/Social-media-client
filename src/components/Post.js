import React, { useRef } from 'react'
import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { BsDot, BsEmojiSmile } from 'react-icons/bs';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import profileImg from '../assets/default-profile-pic.jpg';
import './Post.css'
import { LikeUnlikePost, LikeUnlikeUserPost, LikeUnlikeFeed, settoastData, commentOnMyPost, commentOnUserPost, CommentonPost } from '../internal';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, ClickAwayListener, Container } from '@mui/material';
import Singlecomment from './Singlecomment/Singlecomment';


function Post({ post }) {

    const [comment, setComment] = useState('');
    const [emojiClick, setEmojipick] = useState(false);
    const dispatch = useDispatch();
    const params = useParams();
    const userId = params.userId;
    const myProfile = useSelector(state => state?.appConfigReducer?.myProfile);
    const commentRef = useRef(null);
    const [viewAllComments, setViewAllComments] = useState(false);




    const heartRef = useRef(null);

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

    function handledoubleClick(e) {
        e.preventDefault();
        if (heartRef !== null) {
            heartRef.current.style.display = 'block';
            setTimeout(() => {
                heartRef.current.style.display = 'none';
            }, 1000);
        }

        if (post?.isLiked === false) {
            handleLikeUnlike(e);
        }
    }

    function handleLikeUnlike(e) {
        e.preventDefault();
        try {
            // dispatch(settoastData({ type: 'info', message: 'Liking Post...' }));
            if (userId === myProfile?._id) {
                dispatch(LikeUnlikePost({ postId: post._id }));
            }
            else if (userId) {
                dispatch(LikeUnlikeUserPost({ postId: post._id }));
            }
            else {
                dispatch(LikeUnlikeFeed({ postId: post._id }));
            }
            // dispatch(settoastData({ type: 'success', message: 'Post Liked/Unliked Successfully' }));
        } catch (error) {

        }
    }

    function handlePostComment(e) {
        e.preventDefault();
        try {
            dispatch(settoastData({ type: 'info', message: 'Posting Comment...' }));
            if (userId === myProfile?._id) {
                dispatch(commentOnMyPost({ postId: post._id, caption: comment }));
            }
            else if (userId) {
                dispatch(commentOnUserPost({ postId: post._id, caption: comment }));
            }
            else {
                dispatch(CommentonPost({ postId: post._id, caption: comment }));
            }
            dispatch(settoastData({ type: 'success', message: 'Comment Posted Successfully' }));
            setComment('');
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
                {post?.image?.url ? <><img src={post?.image?.url} alt="post-img" className='post-img' onDoubleClick={handledoubleClick} />
                    <div className="heart-box" ref={heartRef}><AiFillHeart size={140} /></div></>
                    : <div className="caption-section caption-without-image">
                        <div>{post?.caption}</div>
                    </div>}
            </div>
            <div className="post-footer">
                <div className="post-datas">
                    <div className="post-likes">
                        {post?.isLiked ? <AiFillHeart size={25} style={{ color: 'red' }} className='pointer-icon' onClick={handleLikeUnlike} /> : <AiOutlineHeart size={25} className='pointer-icon' onClick={handleLikeUnlike} />}
                        <FaRegComment size={25} className='pointer-icon' onClick={() => { commentRef.current.focus() }} />
                        <FiSend size={25} className='pointer-icon' />
                    </div>
                </div>
                <div className="post-response-count">
                    <div>{post?.likesCount} Likes</div>
                    <BsDot />
                    <div>{post?.commentsCount} Comments</div>
                </div>
                {post?.image?.url ? <div className="caption-section">
                    <div>{post?.caption}</div>
                </div> : <></>}
                <div className="comment-box">
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} className='comment-input' placeholder='Add a comment...' onClick={handleClickonComment} ref={commentRef} />
                    {comment && <button className='comment-btn' onClick={handlePostComment} >Post</button>}
                    <BsEmojiSmile className='emoji-Icon' onClick={(e) => setEmojipick(!emojiClick)} />
                    {emojiClick && <ClickAwayListener onClickAway={(e) => setEmojipick(false)}><div className='emoji-picker-container'><Picker previewPosition='none' data={data} onEmojiSelect={handleEmojiCLick} /></div></ClickAwayListener>}
                </div>
                <div className="view-all-comments">
                    {post?.commentsCount > 0 && !viewAllComments && <div className='hover-grey' onClick={() => setViewAllComments(true)}>View all {post?.commentsCount} comments</div>}
                </div>
                {post?.commentsCount > 0 && viewAllComments &&
                    <div className="shown-comments">
                        {post?.comments?.map((comment) => {
                            return <Singlecomment comment={comment} key={comment._id} />
                        })}
                        <div className='hover-grey' onClick={() => setViewAllComments(false)}>View less comments</div>
                    </div>
                }
                <p className='time-ago'>{post?.timeAgo}</p>
            </div>
        </Container >
    )
}
export default Post



