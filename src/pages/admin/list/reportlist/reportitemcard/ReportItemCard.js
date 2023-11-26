import React from 'react';
import './ReportItemCard.css';
import FadeOut from '../../../../../components/fadeout/FadeOut';
import { useState } from 'react';
import { Grid } from '@mui/material';


//TODO: connect to backend
const ReportItemCard = (props) => {
    const coverGridStyle = {
        'borderRadius': '25px 0px 0px 25px',
        'borderRight': props.status===0?'1px solid #ff0000':'1px solid #00ff00',
        'height': '100%',
        'minHeight': '30vh',
        'width': '100%',
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'center',
        'flexDirection': 'column',
    }
    
    const [fadeout, setFadeout] = useState(false)

    function closeFadeout() {
        setFadeout(false)
    }

    const handleClick = (event) => {
        setFadeout(true)
        window.location.href = props.href
    }

    return (
        <div className={props.status===0?'admin-report-unresolved-item-card-wrapper':'admin-report-resolved-item-card-wrapper'} onClick={handleClick}>
            <Grid container sx={{ height: '100%', width: '100%', alignItems: 'stretch' }}>
                <Grid item xs={4} sx={coverGridStyle}>
                    <img className='admin-report-manga-cover' src={props.chapterCover} alt='AdminReportCardMangaCover'/>
                    <h1 className='admin-report-manga-title'>{props.chapterTitle}</h1>
                </Grid>
                <Grid item xs={8} sx={{display: 'flex', flexDirection: 'column'}}>
                    <div className={props.status===0?'admin-unresolved-report-user-wrapper':'admin-resolved-report-user-wrapper'}>
                        <img className='admin-report-user-avatar' src={props.userAvatar} alt='AdminReportCardUserAvatar'/>
                        <p className='admin-report-user-displayname'>{props.userDisplayname}</p>
                    </div>
                    <div className='admin-report-content-wrapper'>
                        <p className='admin-report-content'>
                            {props.content}
                        </p>
                        <p className='admin-report-updatetime'>
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

export default ReportItemCard