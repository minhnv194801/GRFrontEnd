import React from 'react';
import { useState } from 'react';
import FadeOut from '../../../../components/fadeout/FadeOut';
import './MainAdminItemCard.css'

const MainAdminItemCard = (props) => {
    const [fadeout, setFadeout] = useState(false)

    function closeFadeout() {
        setFadeout(false)
    }

    const handleClick = (event) => {
        setFadeout(true)
        window.location.href = props.href
    }

    return (
        <div className='admin-main-card' onClick={handleClick}>
            <div className='admin-main-card-title'>
                {props.cover}
                <h2>{props.title}</h2>
            </div>
            <div className='admin-main-card-content'>
                <p>{props.content}</p>
            </div>
            <FadeOut 
                open={fadeout}
                close={closeFadeout}
            />
        </div>
    )
}

export default MainAdminItemCard