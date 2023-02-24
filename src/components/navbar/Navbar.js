import {React, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import logo from '../../logo/magna-logo.png'
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import './Navbar.css'
import { InputBase } from '@mui/material';
import Dropdown from 'react-bootstrap/Dropdown';
import LoginModal from '../loginmodal/LoginModal';
import { openLoginModal, openSignupModal } from '../loginmodal/LoginModalSlice';
import { setAvatar, setIsLogin, setRefreshkey, setSessionkey, setUserId, setUsername } from './NavbarSlice';
import { displaySuccess } from '../topalert/TopAlertSlice';

const Navbar = () => {
    const [searchValue, setSearchValue] = useState("")
    const sessionkey = useSelector((state) => state.navbar.sessionkey)
    const refreshkey = useSelector((state) => state.navbar.refreshkey)
    const isLogin = useSelector((state) => state.navbar.isLogin)
    const username = useSelector((state) => state.navbar.username)
    const avatar = useSelector((state) => state.navbar.avatar)
    const dispatch = useDispatch()
    
    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            window.location.href = "/search?" + e.target.value;
        }
    }
    
    const handleSearchClicked = (e) => {
        window.location.href = "/search?value=" + searchValue;
    }

    const handleLogout = (e) => {
        dispatch(setSessionkey(""))
        dispatch(setRefreshkey(""))
        dispatch(setUserId(""))
        dispatch(setIsLogin(false))
        dispatch(setUsername(""))
        dispatch(setAvatar(""))
        dispatch(displaySuccess({
            "title": "Thành công",
            "content": "Đăng xuất thành công",
        }))
    }
    
    useEffect(() => {
        const refreshLogin = async () => {
            const response = await fetch('http://localhost:8080/api/v1/user/refresh', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': refreshkey,
                },
            });
            if (response.ok) {
                // convert data to json
                const json = await response.json();
                
                dispatch(setSessionkey(json.sessionkey))
                dispatch(setRefreshkey(json.refreshkey))
                dispatch(setUserId(json.id))
                dispatch(setIsLogin(json.isLogin))
                dispatch(setUsername(json.username))
                dispatch(setAvatar(json.avatar))
            } else {
                dispatch(setSessionkey(""))
                dispatch(setRefreshkey(""))
                dispatch(setUserId(""))
                dispatch(setIsLogin(false))
                dispatch(setUsername(""))
                dispatch(setAvatar(""))
            }
        }

        refreshLogin()
    }, [])
    
    return (
        <Grid className='navbar' container>
            <Grid sx={{textAlign:'center'}} item xs={3}>
                <a href='/'>
                    <img className='logo' src={logo} alt='logo'/>
                </a>
            </Grid>
            <Grid item xs={5}>
                <InputBase className='text-input' 
                    sx={{background:"#D9D9D9",}}
                    placeholder="Tìm kiếm" 
                    fullWidth
                    onChange={(e) => {setSearchValue(e.target.value)}}
                    onKeyDown={handleKeyPress}
                    startAdornment={
                        <InputAdornment position="start">
                        <SearchIcon />
                        </InputAdornment>
                }/>
            </Grid>
            <Grid item xs={1}>
            <div className='search-btn'>
                <Button 
                    sx={{backgroundColor:'#ed2939', 
                    "&:hover": { backgroundColor: "#cc0023" },
                    marginTop:'auto',
                    marginBottom:'auto',
                    maxHeight:'3vh'}}
                    variant="contained" 
                    onClick={handleSearchClicked}>
                        Tìm kiếm
                </Button>
            </div>
            </Grid>
            <Grid sx={{textAlign:'center', maxHeight:'100%'}} item xs={3}>
                {!isLogin?
                    <div className='userbox' >
                        <a className='loginBtn' onClick={(() => {dispatch(openLoginModal())})} rel='nofollow'>Đăng nhập</a>
                        /
                        <a className='registerBtn' onClick={(() => {dispatch(openSignupModal())})} rel='nofollow'>Đăng ký</a>
                    </div>
                    :
                    <Dropdown>
                        <Dropdown.Toggle className='avatar-dropdown'>
                            <img className='navbar-avatar' src={avatar}/>
                            <p className='username-wrapper'>{username}</p>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href='/user'>Thông tin tài khoản</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                }
            </Grid>
            <LoginModal/>
        </Grid>
    );
};

export default Navbar;