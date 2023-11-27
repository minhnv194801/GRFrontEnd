import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import logo from '../../logo/magna-logo.png'
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import './Navbar.css'
import { IconButton, InputBase } from '@mui/material';
import Dropdown from 'react-bootstrap/Dropdown';
import { logout } from '../../AppSlice';
import { displaySuccess } from '../topalert/TopAlertSlice';
import { useMediaQuery } from 'react-responsive'
import { AccountCircle, Clear } from '@mui/icons-material';
import SearchResult from './searchresults/SearchResult';

const Navbar = () => {
    const [searchValue, setSearchValue] = useState(null)
    const isLogin = useSelector((state) => state.app.isLogin)
    const username = useSelector((state) => state.app.username)
    const avatar = useSelector((state) => state.app.avatar)
    const sessionkey = useSelector((state) => state.app.sessionkey)
    const [isAdmin, setIsAdmin] = useState(false)
    const dispatch = useDispatch()
    const isPortrait = useMediaQuery({ orientation: 'portrait' })
    const [isSearching, setIsSearching] = useState(false)
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        const checkAuth = async () => {
            const response = await fetch(process.env.API_ENDPOINT+'/admin/auth', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Authorization': sessionkey,
                    'Content-Type': 'application/json',
                }
            })

            if (response.ok) {
                setIsAdmin(true)
            }
        }
        checkAuth()
        // eslint-disable-next-line
    }, [])

    const handleChangeSearchTextField = (e) => {
        setSearchValue(e.target.value)
        if (e.target.value.length !== 0) {
            setIsSearching(true)
        }
    }

    const fetchSearchResult = async (searchValue) => {
        if (searchValue === null) {
            return
        }

        if (searchValue.trim().length === 0) {
            setSearchResults([])
            return
        }

        try {
            const response = await fetch(process.env.API_ENDPOINT+'/search', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'query': searchValue,
                    'tags': [],
                    'count': 3,
                    'position': 0,
                })
            });
            if (response.ok) {
                // convert data to json
                const json = await response.json();
                console.log(json.data)

                if (json.data === null || json.data?.length === 0) {
                    setSearchResults([])
                } else {
                    setSearchResults(json.data)
                }
            } else {
                setSearchResults([])
            }
        } catch (error) {
            setSearchResults([])
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchSearchResult(searchValue)
        }, 1000)

        return () => clearTimeout(delayDebounceFn)
    }, [searchValue])

    const handleSubmit = (e) => {
        e.preventDefault()
        window.location.href = "/search?value=" + searchValue;
    }

    const handleSearchFocus = (e) => {
        setIsSearching(true)
    }

    const handleSearchBlur = (e) => {
        setIsSearching(false)
        setSearchValue("")
        setSearchResults([])
    }

    const handleLogout = (e) => {
        dispatch(logout())
        window.location.reload(false);
        dispatch(displaySuccess({
            "title": "Thành công",
            "content": "Đăng xuất thành công",
        }))
    }

    return (
        <div className='navbar'>
            {isPortrait ?
                <div className='navbar-wrapper'>
                    <Grid className='navbar-item-container' container>
                        {isSearching ? <div></div> :
                            <Grid sx={{ textAlign: 'center' }} item xs={3}>
                                <a href='/'>
                                    <img className='logo' src={logo} alt='logo' />
                                </a>
                            </Grid>
                        }
                        <Grid sx={{ textAlign: 'center' }} item xs={12}>
                            <div className='text-input-wrapper'>
                                <form className='text-input' onSubmit={handleSubmit}>
                                    <InputBase
                                        sx={{ background: "#D9D9D9", borderRadius: '25px', maxHeight: '100%' }}
                                        type='text'
                                        placeholder="Tìm kiếm"
                                        fullWidth
                                        value={searchValue}
                                        onChange={handleChangeSearchTextField}
                                        onFocus={handleSearchFocus}
                                        onBlur={handleSearchBlur}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        }
                                        endAdornment={
                                            <IconButton
                                                sx={{ visibility: isSearching ? "visible" : "hidden" }} >
                                                <Clear />
                                            </IconButton>
                                        }
                                    />
                                </form>
                            </div>
                        </Grid>
                        {isSearching ?
                            <div></div>
                            :
                            <Grid sx={{ textAlign: 'right', maxHeight: '100%', marginRight: '10px', marginTop: 'auto', marginBottom: 'auto' }} item xs={2}>
                                {!isLogin ?
                                    <Dropdown align='end'>
                                        <Dropdown.Toggle className='avatar-dropdown'>
                                            <AccountCircle />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.ItemText>
                                                <div className='dropdown-avatar-wrapper'>
                                                    <img className='navbar-avatar' src='https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg' alt='navbar-avatar' />
                                                </div>
                                            </Dropdown.ItemText>
                                            <Dropdown.ItemText>
                                                <div className='dropdown-username-wrapper'>
                                                    Khách
                                                </div>
                                            </Dropdown.ItemText>
                                            <Dropdown.Divider />
                                            <Dropdown.Item href='/login'>Đăng nhập</Dropdown.Item>
                                            <Dropdown.Item href='/register'>Đăng ký</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    :
                                    <Dropdown align='end'>
                                        <Dropdown.Toggle className='avatar-dropdown'>
                                            <img className='navbar-avatar' src={avatar} alt='navbar-avatar' />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.ItemText>
                                                <div className='dropdown-avatar-wrapper'>
                                                    <img className='big-navbar-avatar' src={avatar} alt='navbar-avatar' />
                                                </div>
                                            </Dropdown.ItemText>
                                            <Dropdown.ItemText>
                                                <div className='dropdown-username-wrapper'>
                                                    {username}
                                                </div>
                                            </Dropdown.ItemText>
                                            <Dropdown.Divider />
                                            <Dropdown.Item href='/user'>Thông tin tài khoản</Dropdown.Item>
                                            {isAdmin ? <Dropdown.Item href='/admin'>Vào trang quản lý</Dropdown.Item> : <></>}
                                            <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                }
                            </Grid>
                        }
                    </Grid>
                </div>
                :
                <Grid className='navbar' container>
                    <Grid sx={{ textAlign: 'center' }} item xs={3}>
                        <a href='/'>
                            <img className='logo' src={logo} alt='logo' />
                        </a>
                    </Grid>
                    <Grid item xs={5}>
                        <form className='text-input' onSubmit={handleSubmit}>
                            <InputBase className='text-input'
                                sx={{ background: "#D9D9D9", borderRadius: '25px' }}
                                placeholder="Tìm kiếm"
                                fullWidth
                                value={searchValue}
                                onChange={handleChangeSearchTextField}
                                onFocus={handleSearchFocus}
                                onBlur={handleSearchBlur}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <IconButton
                                        sx={{ visibility: isSearching ? "visible" : "hidden" }} >
                                        <Clear />
                                    </IconButton>
                                }
                            />
                        </form>
                    </Grid>
                    <Grid item xs={1}>
                        <div className='search-btn'>
                            <Button
                                sx={{
                                    backgroundColor: '#ed2939',
                                    "&:hover": { backgroundColor: "#cc0023" },
                                    marginTop: 'auto',
                                    marginBottom: 'auto',
                                    borderRadius: '25px',
                                    height: '3vh',
                                    minHeight: '25px'
                                }}
                                variant="contained"
                                onClick={handleSubmit}>
                                Tìm
                            </Button>
                        </div>
                    </Grid>
                    <Grid sx={{ textAlign: 'right', maxHeight: '100%', minHeight: '30px', width: '100%' }} item xs={3}>
                        {!isLogin ?
                            <Dropdown align='end'>
                                <Dropdown.Toggle className='avatar-dropdown'>
                                    <div className='navbar-avatar-wrapper'>
                                        <img className='navbar-avatar' src='https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg' alt='navbar-avatar' />
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.ItemText>
                                        <div className='dropdown-avatar-wrapper'>
                                            <img className='big-navbar-avatar' src='https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg' alt='navbar-avatar' />
                                        </div>
                                    </Dropdown.ItemText>
                                    <Dropdown.ItemText>
                                        <div className='dropdown-username-wrapper'>
                                            Khách
                                        </div>
                                    </Dropdown.ItemText>
                                    <Dropdown.Divider />
                                    <Dropdown.Item href='/login'>Đăng nhập</Dropdown.Item>
                                    <Dropdown.Item href='/register'>Đăng ký</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            :
                            <Dropdown align='end'>
                                <Dropdown.Toggle className='avatar-dropdown'>
                                    <div className='navbar-avatar-wrapper'>
                                        <img className='navbar-avatar' src={avatar} alt='navbar-avatar' />
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.ItemText>
                                        <div className='dropdown-avatar-wrapper'>
                                            <img className='big-navbar-avatar' src={avatar} alt='navbar-avatar' />
                                        </div>
                                    </Dropdown.ItemText>
                                    <Dropdown.ItemText>
                                        <div className='dropdown-username-wrapper'>
                                            {username}
                                        </div>
                                    </Dropdown.ItemText>
                                    <Dropdown.Divider />
                                    <Dropdown.Item href='/user'>Thông tin tài khoản</Dropdown.Item>
                                    {isAdmin ? <Dropdown.Item href='/admin'>Vào trang quản lý</Dropdown.Item> : <></>}
                                    <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        }
                    </Grid>
                </Grid>
            }
            <SearchResult items={searchResults} />
        </div>
    );
};

export default Navbar;