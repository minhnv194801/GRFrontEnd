import React from 'react'
import './FollowUserCard.css'

const FollowUserCard = (props) => {
    return (
        <div className='followuser-card-wrapper'>
            <img className='followuser-card-avatar' src='/defaultavatar.jpg' alt='avatar' />
            <p>Tên hiển thị</p>
        </div>
    )
}

export default FollowUserCard