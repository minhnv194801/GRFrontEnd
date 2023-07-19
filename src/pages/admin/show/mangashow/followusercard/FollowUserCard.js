import React from 'react'
import './FollowUserCard.css'

const FollowUserCard = (props) => {
    return (
        <div className='followuser-card-wrapper'>
            <img className='followuser-card-avatar' src={props.avatar} alt='avatar' />
            <p>{props.displayname}</p>
        </div>
    )
}

export default FollowUserCard