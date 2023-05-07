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
import { ClickAwayListener, Popper, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { axiosClient } from '../../utils/axiosClient';
import { ACCESS_TOKEN_KEY, removeItem } from '../../utils/localStorageManager';
import { useNavigate } from 'react-router-dom';
import { searchUser, settoastData } from '../../internal';
import Singlesuggestionaccount from '../Suggestions/Singlesuggestionaccount';

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

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    async function handleLogout(e) {
        e.preventDefault();

        try {
            dispatch(settoastData({ type: 'info', message: 'Logging Out...' }));
            await axiosClient.post('/auth/logout');
            removeItem(ACCESS_TOKEN_KEY);
            dispatch(settoastData({ type: 'success', message: 'Logged Out Successfully' }));
            navigate('/auth/login');
        } catch (error) {

        }
    }

    const [searchQuery, setSearchQuery] = React.useState('');
    const searchResults = useSelector(state => state?.appConfigReducer?.searchResults);
    const [results, setresults] = React.useState([]);


    React.useEffect(() => {
        if (searchQuery !== '') {
            dispatch(searchUser({ searchQuery }));
        }
    }, [searchQuery, dispatch])

    React.useEffect(() => {
        setresults(searchResults);
    }, [searchResults])


    return (
        <ClickAwayListener onClickAway={handleClose}>
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
                                    <h3 className='my-logo'>Social Sphere</h3>
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
                            <Search >
                                <SearchIconWrapper>
                                    <AiOutlineSearch />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={searchQuery} onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                    }}
                                    onClick={handleClick}
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

                    <Popper id={id} open={open} anchorEl={anchorEl} sx={{ zIndex: 1 }} onBlur={handleClose}>
                        <Box sx={{ border: 1, p: 2, bgcolor: 'rgb(39,39,39)', marginTop: '20px' }}>
                            {results?.length > 0 ? results?.map((result) => {
                                return <Singlesuggestionaccount key={result._id} suggestion={result} closed={handleClose} />
                            }) :
                                <div className="no-results">
                                    <Typography variant="h6" color="white">No Results Found</Typography>
                                </div>
                            }
                        </Box>
                    </Popper>
                </ThemeProvider>
            </Box>
        </ClickAwayListener >
    );
}