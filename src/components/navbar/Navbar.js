import {React, useState} from 'react';
import logo from '../../logo/magna-logo.png'
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
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
        window.location.href = "/search?" + searchValue;
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
                            onChange={(e) => {setSearchValue(e.target.value)}}
                            onKeyDown={handleKeyPress}
                            startAdornment={
                                <InputAdornment position="start">
                                <SearchIcon />
                                </InputAdornment>
                            }/>
                    </FormControl>
                </div>
                <div className='search-btn'>
                    <Button variant="contained" onClick={handleSearchClicked}>Tìm kiếm</Button>
                </div>
            </div>
            <div className='userbox'>
                <a className='loginBtn' href='/user' rel='nofollow'>Đăng nhập</a>
                /
                <a className='registerBtn' href='/user' rel='nofollow'>Đăng ký</a>
            </div>
        </div>
    );
};

export default Navbar;