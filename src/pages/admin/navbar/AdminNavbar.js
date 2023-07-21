import React from 'react';
import './AdminNavbar.css';
import { useMediaQuery } from 'react-responsive';

const AdminNavbar = (props) => {
    const isPortrait = useMediaQuery({ orientation: 'portrait' })

    const toHomePage = (e) => {
        window.location.href = '/admin'
    }

    const toMangaList = (e) => {
        window.location.href = '/admin/manga'
    }

    const toChapterList = (e) => {
        window.location.href = '/admin/chapter'
    }

    const toUserList = (e) => {
        window.location.href = '/admin/user'
    }

    const toCommentList = (e) => {
        window.location.href = '/admin/comment'
    }

    const toReportList = (e) => {
        window.location.href = '/admin/report'
    }

    return (
        <div className='admin-navbar'>
            <div className='admin-logo-wrapper' onClick={toHomePage}>
                <img className='admin-logo' src='/logo/adminlogo.png' alt='admin-logo' />
            </div>
            {isPortrait ?
                <></>
                :
                <div className='admin-title-wrapper'>
                    <h2 className='admin-title'>ADMIN</h2>
                </div>
            }
            <div className='admin-btn-group-wrapper'>
                <div className={props.selected === 'manga' ? 'active-admin-btn-wrapper' : 'admin-btn-wrapper'} onClick={toMangaList}>
                    Manga
                </div>
                <div className={props.selected === 'chapter' ? 'active-admin-btn-wrapper' : 'admin-btn-wrapper'} onClick={toChapterList}>
                    Chapter
                </div>
                <div className={props.selected === 'user' ? 'active-admin-btn-wrapper' : 'admin-btn-wrapper'} onClick={toUserList}>
                    User
                </div>
                <div className={props.selected === 'comment' ? 'active-admin-btn-wrapper' : 'admin-btn-wrapper'} onClick={toCommentList}>
                    Comment
                </div>
                <div className={props.selected === 'report' ? 'active-admin-btn-wrapper' : 'admin-btn-wrapper'} onClick={toReportList}>
                    Report
                </div>
            </div>
        </div>
    )
}

export default AdminNavbar