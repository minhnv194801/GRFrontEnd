import React from 'react';
import './CommentItemCard.css';
import FadeOut from '../../../../../components/fadeout/FadeOut';
import { useState } from 'react';
import { Grid } from '@mui/material';

const coverGridStyle = {
    'borderRadius': '25px 0px 0px 25px',
    'borderRight': '1px solid #0099ff',
    'height': '100%',
    'minHeight': '30vh',
    'width': '100%',
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'flexDirection': 'column',
}

//TODO: connect to backend
const CommentItemCard = (props) => {
    const [fadeout, setFadeout] = useState(false)

    function closeFadeout() {
        setFadeout(false)
    }

    const handleClick = (event) => {
        setFadeout(true)
        window.location.href = props.href
    }

    return (
        <div className='admin-comment-item-card-wrapper' onClick={handleClick}>
            <Grid container sx={{ height: '100%', width: '100%', alignItems: 'stretch' }}>
                <Grid item xs={4} sx={coverGridStyle}>
                    <img className='admin-comment-manga-cover' src={props.mangaCover} />
                    <h1 className='admin-comment-manga-title'>{props.mangaTitle}</h1>
                </Grid>
                <Grid item xs={8} sx={{display: 'flex', flexDirection: 'column'}}>
                    <div className='admin-comment-user-wrapper'>
                        <img className='admin-comment-user-avatar' src={props.userAvatar} />
                        <p className='admin-comment-user-displayname'>{props.userDisplayname}</p>
                    </div>
                    <div className='admin-comment-content-wrapper'>
                        <p className='admin-comment-content'>
                            {props.content}
                        </p>
                        <p className='admin-comment-updatetime'>
                            {props.updateTime}
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

export default CommentItemCard