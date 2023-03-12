import React, { useEffect, useRef } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Feed from './components/feed/Feed'
import Profile from './components/profile/Profile'
import RequireUser from './components/RequireUser'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import LoadingBar from 'react-top-loading-bar';
import { useSelector } from 'react-redux'
import OnlyIfNotloggedIn from './components/OnlyIfNotloggedIn'
import Userprofile from './components/Userprofile/Userprofile'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const loadingRef = useRef(null);
  const isLoading = useSelector(state => state?.appConfigReducer?.isLoading);
  const toastData = useSelector(state => state?.appConfigReducer?.toastData);
  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    }
    else {
      loadingRef.current?.complete();
    }
  }, [isLoading])

  useEffect(() => {
    toast.dismiss();
    switch (toastData?.type) {
      case 'success':
        toast.success(`${toastData.message}`);
        break;
      case 'error':
        toast.error(`${toastData.message}`);
        break;
      case 'warning':
        toast.warning(`${toastData.message}`);
        break;
      case 'info':
        toast.info(`${toastData.message}`);
        break;
      default:
        break;
    }
  }, [toastData])


  return (
    <div className='bodyContainer'>
      <LoadingBar color='#24a0ff' ref={loadingRef} />

      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/userprofile/:userId" element={<Userprofile />} />
          </Route>
        </Route>
        <Route element={<OnlyIfNotloggedIn />}>
          <Route element={<Login />} path='/auth/login' />
          <Route element={<Signup />} path='/auth/signup' />
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default App