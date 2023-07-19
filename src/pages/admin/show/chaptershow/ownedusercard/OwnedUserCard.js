import React from 'react'
import './OwnedUserCard.css'

const OwnedUserCard = (props) => {
    return (
        <div className='owneduser-card-wrapper'>
            <img className='owneduser-card-avatar' src={props.avatar} alt='avatar' />
            <p>{props.displayname}</p>
        </div>
    )
}

export default OwnedUserCard