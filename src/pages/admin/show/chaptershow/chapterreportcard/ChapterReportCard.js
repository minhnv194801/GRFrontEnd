import React from 'react'
import './ChapterReportCard.css'

const ChapterReportCard = (props) => {
    return (
        <div className={props.status===0?'chapter-unfinish-report-card-wrapper':'chapter-finish-report-card-wrapper'}>
            <div className={props.status===0?'chapter-unfinished-report-card-user-wrapper':'chapter-finished-report-card-user-wrapper'}>
                <img className='chapter-report-card-avatar' src={props.useravatar} alt='avatar' />
                <p className='chapter-report-card-user-displayname'>{props.userdisplayname}</p>
            </div>
            <div className='chapter-report-card-content-wrapper'>
                <p className='chapter-report-content'>
                    {props.content}
                </p>
                <p className='chapter-report-updatetime'>
                    {props.createdTime}
                </p>
            </div>
        </div>
    )
}

export default ChapterReportCard