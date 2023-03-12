import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { AiFillHome, AiOutlineMessage } from 'react-icons/ai';
import { MdOutlineExplore } from 'react-icons/md';
import { BsFillCollectionPlayFill } from 'react-icons/bs';
import { FiPlusSquare } from 'react-icons/fi';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import profileImg from '../../assets/default-profile-pic.jpg';
import './Bottombar.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#000',
        },
    },
});


export default function BottomAppBar() {

    const [avatar, setavatar] = React.useState(false);
    const myProfile = useSelector(state => state.appConfigReducer?.myProfile);
    const navigate = useNavigate();
    React.useEffect(() => {
        setavatar(myProfile?.avatar?.url || '');
    }, [myProfile])

    function handleProfileOpen(e) {
        e.preventDefault();
        navigate(`/profile/${myProfile?._id}`);
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <IconButton color="inherit" onClick={() => { navigate('/') }}>
                        <AiFillHome size={28} />
                    </IconButton>
                    <IconButton color="inherit" >
                        <MdOutlineExplore size={28} />
                    </IconButton>
                    <IconButton color="inherit" >
                        <BsFillCollectionPlayFill size={28} />
                    </IconButton>
                    <IconButton color="inherit" >
                        <FiPlusSquare size={28} />
                    </IconButton>
                    <IconButton color="inherit" >
                        < AiOutlineMessage size={28} />
                    </IconButton>
                    <IconButton color="inherit" onClick={handleProfileOpen}>
                        <img src={avatar ? avatar : profileImg} alt="profile" className='profileImg-box' />
                    </IconButton>
                </Toolbar>
            </AppBar >
        </ThemeProvider>
    );
}

