import React from 'react';
import './FollowMangaCard.css';

//TODO: connect to backend
const FollowMangaCard = (props) => {
    return (
        <div className='admin-follow-manga-card-wrapper'>
            <div className='admin-follow-manga-card-cover-wrapper'>
                <img className='admin-follow-manga-card-cover' src={props.cover} alt='card-cover' />
            </div>
            <div className='admin-follow-manga-card-title-wrapper'>
                <p className='admin-follow-manga-title'>{props.content}</p>
            </div>
        </div>
    )
}

export default FollowMangaCard