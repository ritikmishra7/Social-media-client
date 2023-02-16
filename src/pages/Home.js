import React from 'react'
import Navbar from '../components/Navbar'
import './Home.css'
import Post from '../components/Post';
import Story from '../components/Story';
import Suggestions from '../components/Suggestions';
function Home() {




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