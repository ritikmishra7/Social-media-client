import React from 'react'
import { ReactComponent as NoPost } from '../../assets/no_post.svg';
import './Nopostavailable.css'

function Nopostavailable() {
    return (
        <div className="no-posts posts center-thing">
            <NoPost className='center-thing no-post-svg' />
            <p className='no-post-caption'>No Posts available</p>
        </div>
    )
}

export default Nopostavailable
