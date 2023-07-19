import React from 'react'
import './ChapterReportCard.css'

const ChapterReportCard = (props) => {
    return (
        <div className={props.status===0?'chapter-unfinish-report-card-wrapper':'chapter-finish-report-card-wrapper'}>
            <div className='chapter-report-card-user-wrapper'>
                <img className='chapter-report-card-avatar' src='/defaultavatar.jpg' alt='avatar' />
                <p className='chapter-report-card-user-displayname'>Tên hiển thị</p>
            </div>
            <div className='chapter-report-card-content-wrapper'>
                <p className='chapter-report-content'>
                    Ảnh chương truyện bị lỗi rồi
                </p>
                <p className='chapter-report-updatetime'>
                    16:57 1/02/2023
                </p>
            </div>
        </div>
    )
}

export default ChapterReportCard