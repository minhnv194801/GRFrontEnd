import React from 'react';
import './ChapterItemCard.css';
import FadeOut from '../../../../../components/fadeout/FadeOut';
import { useState } from 'react';

//TODO: connect to backend
const ChapterItemCard = (props) => {
    const [fadeout, setFadeout] = useState(false)

    function closeFadeout() {
        setFadeout(false)
    }

    const handleClick = (event) => {
        setFadeout(true)
        window.location.href = props.href
    }

    return (
        <div className='admin-chapter-item-card-wrapper' onClick={handleClick}>
            <div className='admin-chapter-item-card-cover-wrapper'>
                <img className='admin-chapter-item-card-cover' src={props.cover} alt='card-cover' />
            </div>
            <div className='admin-chapter-item-card-title-wrapper'>
                <p className='admin-chapter-item-title'>{props.content}</p>
            </div>
            <FadeOut
                open={fadeout}
                close={closeFadeout}
            />
        </div>
    )
}

export default ChapterItemCard