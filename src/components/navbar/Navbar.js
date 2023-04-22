import {React, useState} from 'react';
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
import { setSessionkey, setRefreshkey, setIsLogin, logout } from '../../AppSlice';
import { displaySuccess } from '../topalert/TopAlertSlice';
import { useMediaQuery } from 'react-responsive'

const Navbar = () => {
    const [searchValue, setSearchValue] = useState("")
    const isLogin = useSelector((state) => state.app.isLogin)
    const username = useSelector((state) => state.app.username)
    const avatar = useSelector((state) => state.app.avatar)
    const dispatch = useDispatch()
    const isPortrait = useMediaQuery({ orientation: 'portrait' })
    
    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            window.location.href = "/search?value=" + e.target.value;
        }
    }
    
    const handleSearchClicked = (e) => {
        window.location.href = "/search?value=" + searchValue;
    }

    const handleLogout = (e) => {
        dispatch(logout())
        dispatch(displaySuccess({
            "title": "Thành công",
            "content": "Đăng xuất thành công",
        }))
    }
    
    return (
        <div className='navbar'>
            {isPortrait?
                <div className='navbar-wrapper'>
                    <Grid className='navbar-item-container' container>
                        <Grid sx={{textAlign:'center'}} item xs={3}>
                            <a href='/'>
                                <img className='logo' src={logo} alt='logo'/>
                            </a>
                        </Grid>
                        <Grid sx={{textAlign:'right', maxHeight:'100%', marginRight:'10px', marginTop:'auto', marginBottom:'auto'}} item xs={9}>
                            {!isLogin?
                                <div className='userbox' >
                                    <a className='loginBtn' onClick={(() => {dispatch(openLoginModal())})} rel='nofollow'>Đăng nhập</a>
                                    /
                                    <a className='registerBtn' onClick={(() => {dispatch(openSignupModal())})} rel='nofollow'>Đăng ký</a>
                                </div>
                                :
                                <Dropdown align='end'>
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
                    </Grid>
                    <Grid className='navbar-searchbox-container' container>
                        <Grid item xs={12}>
                        <InputBase className='text-input' 
                                sx={{background:"#D9D9D9", borderRadius:'25px'}}
                                placeholder="Tìm kiếm" 
                                fullWidth
                                onChange={(e) => {setSearchValue(e.target.value)}}
                                onKeyDown={handleKeyPress}
                                startAdornment={
                                    <InputAdornment position="start">
                                    <SearchIcon />
                                    </InputAdornment>
                                }
                            />
                        </Grid>
                    </Grid>
                </div>
            :
                <Grid className='navbar' container>
                    <Grid sx={{textAlign:'center'}} item xs={3}>
                        <a href='/'>
                            <img className='logo' src={logo} alt='logo'/>
                        </a>
                    </Grid>
                    <Grid item xs={5}>
                        <InputBase className='text-input' 
                            sx={{background:"#D9D9D9", borderRadius:'25px'}}
                            placeholder="Tìm kiếm" 
                            fullWidth
                            onChange={(e) => {setSearchValue(e.target.value)}}
                            onKeyDown={handleKeyPress}
                            startAdornment={
                                <InputAdornment position="start">
                                <SearchIcon />
                                </InputAdornment>
                            }
                        />
                    </Grid>
                    <Grid item xs={1}>
                    <div className='search-btn'>
                        <Button 
                            sx={{backgroundColor:'#ed2939', 
                            "&:hover": { backgroundColor: "#cc0023" },
                            marginTop:'auto',
                            marginBottom:'auto',
                            borderRadius: '25px',
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
                </Grid>
            }
            <LoginModal/>
        </div>
    );
};

export default Navbar;