import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux'
import { displaySuccess } from '../../../components/topalert/TopAlertSlice'
import { setUserAvatar, setUsername } from '../UserSlice';

function Owned() {
    return (
        <div>
            Owned list
        </div>
    )
}

export default Owned