import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { AiOutlineSearch, AiOutlineLogout } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './Topbar.css';
import { Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { axiosClient } from '../../utils/axiosClient';
import { ACCESS_TOKEN_KEY, removeItem } from '../../utils/localStorageManager';
import { useNavigate } from 'react-router-dom';
import { settoastData } from '../../internal';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#000',
        },
    },
});


export default function Topbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function handleLogout(e) {
        e.preventDefault();

        try {
            await axiosClient.post('/auth/logout');
            removeItem(ACCESS_TOKEN_KEY);
            navigate('/auth/login');
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Box sx={{ flexGrow: 1, marginTop: 5 }}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="fixed" color="primary" enableColorOnDark>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <div className="insta-box">
                                <h3 className='my-logo'>Social Media</h3>
                                <IconButton
                                    size="small"
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    sx={{ mr: 2 }}
                                >
                                    <MdKeyboardArrowDown />
                                </IconButton>
                            </div>

                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <AiOutlineSearch />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Tooltip title="Logout" arrow>
                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ marginInline: 2 }}
                                onClick={handleLogout}>
                                <AiOutlineLogout />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </Box>
    );
}