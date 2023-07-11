import React from 'react';
import { AccountCircle, Comment, Report } from '@mui/icons-material';
import './MainAdmin.css';
import MainAdminItemCard from './component/MainAdminItemCard';

const iconStyle = {
    'height': '150px',
    'width': '100px',
}

//TODO: connect to backend
const MainAdmin = (props) => {
    return (
        <div className='main-admin-wrapper'>
            <MainAdminItemCard
                cover={<img className='admin-main-card-cover'
                    src='/mangaicon.jpg' 
                    alt='manga-cover'/>}
                title='MANGA'
                content='150 items'
                href='/admin/manga'
            />
            <MainAdminItemCard
                cover={<img className='admin-main-card-cover'
                    src='/chaptericon.jpg'
                    alt='chapter-cover'
                />}
                title='CHAPTER'
                content='150 items'
                href='/admin/chapter'
            />
            <MainAdminItemCard
                cover={<AccountCircle sx={iconStyle} />}
                title='USER'
                content='150 items'
                href='/admin/user'
            />
            <MainAdminItemCard
                cover={<Comment sx={iconStyle} />}
                title='COMMENT'
                content='150 items'
                href='/admin/comment'
            />
            <MainAdminItemCard
                cover={<Report sx={iconStyle} />}
                title='REPORT'
                content='150 items'
                href='/admin/report'
            />
        </div>
    )
}

export default MainAdmin