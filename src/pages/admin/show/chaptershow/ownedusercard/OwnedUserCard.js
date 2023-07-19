import React from 'react'
import './OwnedUserCard.css'

const OwnedUserCard = (props) => {
    return (
        <div className='owneduser-card-wrapper'>
            <img className='owneduser-card-avatar' src='/defaultavatar.jpg' alt='avatar' />
            <p>Tên hiển thị</p>
        </div>
    )
}

export default OwnedUserCard