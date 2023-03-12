import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import './Home.css'
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMyInfo } from '../internal';
function Home() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMyInfo());
    }, [dispatch])

    return (
        <div className='home-div'>
            <Navbar />
            <Outlet />
        </div >
    )
}

export default Home