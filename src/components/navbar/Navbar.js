import {React, useState} from 'react';
import logo from '../../logo/magna-logo.png'
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import './Navbar.css'
import { InputBase } from '@mui/material';

const Navbar = () => {
    const [searchValue, setSearchValue] = useState("")

    function handleKeyPress(e) {
        if(e.keyCode === 13){
            window.location.href = "/search?" + e.target.value;
         }
    }

    function handleSearchClicked(e) {
        window.location.href = "/search?value=" + searchValue;
    }

    return (
        <Grid className='navbar' container>
            <Grid item xs={3}>
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
                <Button variant="contained" onClick={handleSearchClicked}>Tìm kiếm</Button>
            </div>
            </Grid>
            <Grid item xs={3}>
                <div className='userbox'>
                    <a className='loginBtn' href='/user' rel='nofollow'>Đăng nhập</a>
                    /
                    <a className='registerBtn' href='/user' rel='nofollow'>Đăng ký</a>
                </div>
            </Grid>
        </Grid>
    );
};

export default Navbar;