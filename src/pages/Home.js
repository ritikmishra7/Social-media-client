import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import './Home.css'
import Post from '../components/Post';
import Story from '../components/Story';
import Suggestions from '../components/Suggestions';
import { axiosClient } from '../utils/axiosClient';
function Home() {

    useEffect(() => {
        fetchData();
    }, [])
    
    const fetchData = async () =>  
    {
        return await axiosClient.get('/posts')
    }

    return (
        <div>
            <Navbar />
            <div className="main-section">
                <div className="story-section center-thing">
                    <Story />
                    <Story />
                    <Story />
                    <Story />
                    <Story />
                    <Story />
                </div>
                <div className='posts center-thing'>
                    <Post />
                    <Post />
                    <Post />
                </div>
                <Suggestions />
            </div>
        </div >
    )
}

export default Home