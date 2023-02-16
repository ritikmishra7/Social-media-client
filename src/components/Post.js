import React from 'react'
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiSend, FiBookmark } from 'react-icons/fi';
import { BsDot, BsEmojiSmile } from 'react-icons/bs';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import profileImg from '../assets/default-profile-pic.jpg';
import './Post.css'


function Post() {

    const [comment, setComment] = useState('');
    const [emojiClick, setEmojipick] = useState(false);

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


    return (
        <div className="post-section center-thing   ">
            <div className="post-header">
                <img src={profileImg} alt="profile-pic" className='storyImg-box' />
                <div className="username">
                    <span>Ritik Mishra</span>
                    <BsDot />
                    <span>19h</span>
                </div>
            </div>
            <div className="content">
                <img src="https://images.unsplash.com/photo-1675967368088-457ba4ffac05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=60" alt="post-img" className='post-img' />
            </div>
            <div className="post-footer">
                <div className="post-datas">
                    <div className="post-likes">
                        <AiOutlineHeart size={25} className='pointer-icon' />
                        <FaRegComment size={25} className='pointer-icon' />
                        <FiSend size={25} className='pointer-icon' />
                    </div>
                    <FiBookmark size={25} className='pointer-icon' />
                </div>
                <p>223 Likes</p>
                <div className="caption-section">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit cum itaque ipsa debitis</p>
                </div>
                <div className="comment-box">
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} className='comment-input' placeholder='Add a comment...' onClick={handleClickonComment} />
                    <BsEmojiSmile className='emoji-Icon' onClick={(e) => setEmojipick(!emojiClick)} />
                    {emojiClick && <div className='emoji-picker-container'><Picker previewPosition='none' data={data} onEmojiSelect={handleEmojiCLick} /></div>}
                </div>
            </div>
        </div>
    )
}

export default Post