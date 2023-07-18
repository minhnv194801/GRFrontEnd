import React from 'react';
import './MangaChapterCard.css';

//TODO: connect to backend
const MangaChapterCard = (props) => {
    return (
        <div className='manga-chapter-card-wrapper'>
            <div className='manga-chapter-card-cover-wrapper'>
                <img className='manga-chapter-card-cover' src={props.cover} alt='card-cover' />
            </div>
            <div className='manga-chapter-card-title-wrapper'>
                <p className='manga-chapter-title'>{props.content}</p>
            </div>
        </div>
    )
}

export default MangaChapterCard