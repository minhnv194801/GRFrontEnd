import React from 'react';
import './UserReportCard.css';

//TODO: connect to backend
const UserReportCard = (props) => {
    return (
        <div className={props.status===0?'admin-user-unfinish-report-card-wrapper':'admin-user-finish-report-card-wrapper'}>
            <div className={props.status===0?'admin-user-unfinish-report-card-manga-wrapper':'admin-user-finish-report-card-manga-wrapper'}>
                <img className='admin-user-report-card-manga-cover' src={props.mangaCover} alt='manga-cover' />
                <p className='admin-user-report-card-manga-title'>{props.mangaTitle}</p>
            </div>
            <div className='admin-user-report-card-content-wrapper'>
                <p className='admin-user-report-card-content'>
                    {props.content}
                </p>
                <p className='admin-user-report-card-updatetime'>
                    {props.updateTime}
                </p>
            </div>
        </div>
    )
}

export default UserReportCard