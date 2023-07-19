import React from 'react'
import './MangaCommentCard.css'

const MangaCommentCard = (props) => {
    return (
        <div className='manga-comment-card-wrapper'>
            <div className='manga-comment-card-user-wrapper'>
                <img className='manga-comment-card-avatar' src={props.useravatar} alt='avatar' />
                <p className='manga-comment-card-user-displayname'>{props.userdisplayname}</p>
            </div>
            <div className='manga-comment-card-content-wrapper'>
                <p className='manga-comment-content'>
                    {props.content}
                </p>
                <p className='manga-comment-updatetime'>
                    {props.updateTime}
                </p>
            </div>

        </div>
    )
}

export default MangaCommentCard