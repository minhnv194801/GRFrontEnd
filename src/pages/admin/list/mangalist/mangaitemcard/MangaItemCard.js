import React from 'react';
import './MangaItemCard.css';
import FadeOut from '../../../../../components/fadeout/FadeOut';
import { useState } from 'react';

//TODO: connect to backend
const MangaItemCard = (props) => {
    const [fadeout, setFadeout] = useState(false)

    function closeFadeout() {
        setFadeout(false)
    }

    const handleClick = (event) => {
        setFadeout(true)
        window.location.href = props.href
    }

    return (
        <div className='admin-manga-item-card-wrapper' onClick={handleClick}>
            <div className='admin-manga-item-card-cover-wrapper'>
                <img className='admin-manga-item-card-cover' src={props.cover} alt='card-cover' />
            </div>
            <div className='admin-manga-item-card-title-wrapper'>
                <p className='admin-manga-item-title'>{props.content}</p>
            </div>
            <FadeOut
                open={fadeout}
                close={closeFadeout}
            />
        </div>
    )
}

export default MangaItemCard