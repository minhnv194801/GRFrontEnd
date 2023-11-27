import React, { useEffect, useState } from 'react';
import { AccountCircle, Comment, Report } from '@mui/icons-material';
import MainAdminItemCard from './component/MainAdminItemCard';
import './MainAdmin.css';
import { useSelector } from 'react-redux';

const iconStyle = {
    'height': '150px',
    'width': '100px',
}

//TODO: connect to backend
const MainAdmin = (props) => {
    const [mangaCount, setMangaCount] = useState("")
    const [userCount, setUserCount] = useState("")
    const [chapterCount, setChapterCount] = useState("")
    const [reportCount, setReportCount] = useState("")
    const [commentCount, setCommentCount] = useState("")
    const sessionkey = useSelector((state) => state.app.sessionkey)

    useEffect(() => {
        const fetchUserCount = async () => {
            const response = await fetch(process.env.API_ENDPOINT+'/admin/users/count', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Authorization': sessionkey,
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                // convert data to json
                const json = await response.json();

                setUserCount(json)
            }
        }

        const fetchMangaCount = async () => {
            const response = await fetch(process.env.API_ENDPOINT+'/admin/mangas/count', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Authorization': sessionkey,
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                // convert data to json
                const json = await response.json();

                setMangaCount(json)
            }
        }

        const fetchChapterCount = async () => {
            const response = await fetch(process.env.API_ENDPOINT+'/admin/chapters/count', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Authorization': sessionkey,
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                // convert data to json
                const json = await response.json();

                setChapterCount(json)
            }
        }

        const fetchReportCount = async () => {
            const response = await fetch(process.env.API_ENDPOINT+'/admin/reports/count', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Authorization': sessionkey,
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                // convert data to json
                const json = await response.json();

                setReportCount(json)
            }
        }

        const fetchCommentCount = async () => {
            const response = await fetch(process.env.API_ENDPOINT+'/admin/comments/count', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Authorization': sessionkey,
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                // convert data to json
                const json = await response.json();

                setCommentCount(json)
            }
        }

        fetchUserCount()
        fetchMangaCount()
        fetchChapterCount()
        fetchCommentCount()
        fetchReportCount()
        // eslint-disable-next-line
    }, [])

    return (
        <div className='main-admin-wrapper'>
            <MainAdminItemCard
                cover={<img className='admin-main-card-cover'
                    src='/mangaicon.jpg'
                    alt='manga-cover' />}
                title='MANGA'
                content={mangaCount + ' items'}
                href='/admin/manga'
            />
            <MainAdminItemCard
                cover={<img className='admin-main-card-cover'
                    src='/chaptericon.jpg'
                    alt='chapter-cover'
                />}
                title='CHAPTER'
                content={chapterCount + ' items'}
                href='/admin/chapter'
            />
            <MainAdminItemCard
                cover={<AccountCircle sx={iconStyle} />}
                title='USER'
                content={userCount + ' items'}
                href='/admin/user'
            />
            <MainAdminItemCard
                cover={<Comment sx={iconStyle} />}
                title='COMMENT'
                content={commentCount + ' items'}
                href='/admin/comment'
            />
            <MainAdminItemCard
                cover={<Report sx={iconStyle} />}
                title='REPORT'
                content={reportCount + ' items'}
                href='/admin/report'
            />
        </div>
    )
}

export default MainAdmin