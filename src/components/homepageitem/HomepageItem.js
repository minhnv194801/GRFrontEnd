import React from 'react';
import './HomepageItem.css'

const HomepageItem = (props) => {
    return (
        <div className='homepage-item-wrapper'>
            <a href={props.item.href}>
                <img className='cover' src={props.item.cover} alt='chapterCover'/>
            </a>
            <a className='chapter-title' href={props.item.href}>
                <h2>{props.item.name}</h2>
            </a>
            <ul className='item-chapter-list'>
                {props.item.chapters.map((chapter) => 
                    <li className='chapter-item'>
                        <a className='chapter-title' href={chapter.href}>
                            {chapter.name}
                        </a>
                        <i className='time'>
                            {chapter.updateTime}
                        </i>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default HomepageItem;