import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import profileImg from '../../assets/default-profile-pic.jpg';

function Singlecomment({ comment }) {
    return (
        <div className="all-comments">
            <div className="comment-header" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBlock: '10px' }}>
                <Link to={`/userProfile/${comment?.commentOwner?._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                    <Avatar alt="profile-image" src={comment?.commentOwner?.avatar?.url ? comment?.commentOwner?.avatar?.url : profileImg} sx={{ width: 24, height: 24 }} />
                    <div className='comment-username' style={{ fontWeight: '500' }}>{comment?.commentOwner?.username}</div>
                </Link>
                <div className="comment" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div>{comment?.caption}</div>
                    <p className='time-ago'>{comment?.timeAgo}</p>
                </div>
            </div>
        </div>
    )
}

export default Singlecomment