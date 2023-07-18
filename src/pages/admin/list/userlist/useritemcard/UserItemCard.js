import React from 'react';
import './UserItemCard.css';
import FadeOut from '../../../../../components/fadeout/FadeOut';
import { useState } from 'react';
import { Grid } from '@mui/material';

//TODO: connect to backend
const UserItemCard = (props) => {
    const [fadeout, setFadeout] = useState(false)

    function closeFadeout() {
        setFadeout(false)
    }

    const handleClick = (event) => {
        setFadeout(true)
        window.location.href = props.href
    }

    return (
        <div className='admin-user-item-card-wrapper' onClick={handleClick}>
            <Grid container spacing={1} sx={{height: '100%'}}>
                <Grid item xs={3}>
                    <div className='admin-user-avatar-wrapper'>
                        <img className='admin-user-avatar' src={props.avatar} alt='user-avatar' />
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <div className='admin-user-item-card-content-wrapper'>
                        <h1 className='admin-user-display-name'>
                            {props.displayName}
                        </h1>
                        <p className='admin-user-email'>
                            {props.email}
                        </p>
                        <p className='admin-user-role'>
                            {props.role}
                        </p>
                    </div>
                </Grid>
            </Grid>
            <FadeOut
                open={fadeout}
                close={closeFadeout}
            />
        </div>
    )
}

export default UserItemCard