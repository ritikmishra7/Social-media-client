import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Nopostavailable from '../Nopostavailable/Nopostavailable';
import Post from '../Post';

function Otheruserposts() {

    const userProfile = useSelector(state => state.userProfileReducer?.userProfile);
    const [posts, setposts] = useState([]);

    useEffect(() => {
        setposts(userProfile?.posts);
    }, [userProfile])

    return (
        <div className='posts center-thing'>
            {posts?.length ? userProfile?.posts?.map((post) => { return <Post post={post} key={post._id} /> }) : <Nopostavailable />}
        </div>
    )
}

export default Otheruserposts