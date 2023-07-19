import React from 'react';
import './OwnedChapterCard.css';

//TODO: connect to backend
const OwnedChapterCard = (props) => {
    return (
        <div className='owned-chapter-card-wrapper'>
            <div className='owned-chapter-card-cover-wrapper'>
                <img className='owned-chapter-card-cover' src={props.cover} alt='card-cover' />
            </div>
            <div className='owned-chapter-card-title-wrapper'>
                <p className='owned-chapter-title'>{props.content}</p>
            </div>
        </div>
    )
}

export default OwnedChapterCard