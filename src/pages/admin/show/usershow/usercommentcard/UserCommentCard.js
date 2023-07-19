import React from 'react';
import './UserCommentCard.css';

//TODO: connect to backend
const UserCommentCard = (props) => {
    return (
        <div className='admin-user-comment-card-wrapper'>
            <div className='admin-user-comment-card-manga-wrapper'>
                <img className='admin-user-comment-card-manga-cover' src={props.mangaCover} alt='manga-cover' />
                <p className='admin-user-comment-card-manga-title'>{props.mangaTitle}</p>
            </div>
            <div className='admin-user-comment-card-content-wrapper'>
                <p className='admin-user-comment-card-content'>
                    {props.content}
                </p>
                <p className='admin-user-comment-card-updatetime'>
                    {props.updateTime}
                </p>
            </div>
        </div>
    )
}

export default UserCommentCard