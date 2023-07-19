import React from 'react'
import './MangaCommentCard.css'

const MangaCommentCard = (props) => {
    return (
        <div className='manga-comment-card-wrapper'>
            <div className='manga-comment-card-user-wrapper'>
                <img className='manga-comment-card-avatar' src='/defaultavatar.jpg' alt='avatar' />
                <p className='manga-comment-card-user-displayname'>Tên hiển thị</p>
            </div>
            <div className='manga-comment-card-content-wrapper'>
                <p className='manga-comment-content'>
                    Truyện hay!
                </p>
                <p className='manga-comment-updatetime'>
                    16:57 1/02/2023
                </p>
            </div>

        </div>
    )
}

export default MangaCommentCard