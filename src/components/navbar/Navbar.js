import React from 'react';
import logo from '../../logo/magna-logo.png'
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import './Navbar.css'
import { InputBase } from '@mui/material';


const Navbar = () => {
    function handleKeyPress(e) {
        if(e.keyCode === 13){
            console.log('value', e.target.value);
            // put the login here
         }
    }

    return (
        <div className='navbar'>
            <div>
                <a href='/'>
                    <img className='logo' src={logo} alt='logo'/>
                </a>
            </div>
            <div className='center'>
                <div className='text-input'>
                    <FormControl variant="standard">
                        <InputBase className='text-input' 
                            placeholder="Tìm kiếm" 
                            onKeyDown={handleKeyPress}
                            startAdornment={
                                <InputAdornment position="start">
                                <SearchIcon />
                                </InputAdornment>
                            }/>
                    </FormControl>
                </div>
                <div className='search-btn'>
                    <Button variant="contained">Tìm kiếm</Button>
                </div>
            </div>
            <div className='userbox'>
                <a href='/about' rel='nofollow'>Đăng nhập</a>
                /
                <a href='/about' rel='nofollow'>Đăng ký</a>
            </div>
        </div>
    );
};

export default Navbar;