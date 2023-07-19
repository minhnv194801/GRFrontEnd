import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ShowAdminWrapper from "../component/showadminwrapper/ShowAdminWrapper";
import './ChapterAdminShow.css'
import { Add, CircleOutlined, Clear, Edit, } from "@mui/icons-material"
import { IconButton } from "@mui/material";
import OwnedUserCard from "./ownedusercard/OwnedUserCard";
import ChapterReportCard from "./chapterreportcard/ChapterReportCard";

const iconStyle = {
  'color': '#0099FF',
}

function ChapterAdminShow() {
  const params = useParams()

  const [chapterId] = useState(params.id)
  const [item, setItem] = useState({})
  const [mangaId, setMangaId] = useState("")
  const [manga, setManga] = useState([])
  const [ownedUserIds, setOwnedUserIds] = useState([])
  const [ownedUsers, setOwnedUsers] = useState([])
  const [reportIds, setReportIds] = useState([])
  const [reports, setReports] = useState([])

  useEffect(() => {
    let fetchItem = {
      'id': params.id,
      'manga': '1',
      'title': 'Chapter',
      'cover': '/chaptericon.jpg',
      'price': 5000,
      'updateTime': '16:57 1/02/2023',
      'images': ['/chaptericon.jpg', '/chaptericon.jpg', '/chaptericon.jpg', '/chaptericon.jpg', '/chaptericon.jpg'],
      'ownedUsers': ['1'],
      'reports': ['1']
    }

    setItem(fetchItem)
    setMangaId(fetchItem.manga)
    setOwnedUserIds(fetchItem.ownedUsers)
    setReportIds(fetchItem.reports)
  }, [])

  useEffect(() => {
    if (mangaId !== '') {
      let fetchManga = {
        'id': '1',
        'cover': '/mangaicon.jpg',
        'title': 'Manga'
      }
      setManga(fetchManga)
    }
  }, [mangaId])

  useEffect(() => {
    if (ownedUserIds.length !== 0) {
      let fetchOwnedUsers = [
        {
          'avatar': '/defaultavatar.jpg',
          'displayname': 'Tên hiển thị',
        },
        {
          'avatar': '/defaultavatar.jpg',
          'displayname': 'Tên hiển thị',
        },
        {
          'avatar': '/defaultavatar.jpg',
          'displayname': 'Tên hiển thị',
        },
        {
          'avatar': '/defaultavatar.jpg',
          'displayname': 'Tên hiển thị',
        },
        {
          'avatar': '/defaultavatar.jpg',
          'displayname': 'Tên hiển thị',
        },
      ]
      setOwnedUsers(fetchOwnedUsers)
    }
  }, [ownedUserIds])

  useEffect(() => {
    if (reportIds.length !== 0) {
      let fetchReports = [
        {
          'user': {
            'avatar': '/defaultavatar.jpg',
            'displayname': 'Tên hiển thị'
          },
          'content': 'Ảnh chương truyện bị lỗi',
          'createdTime': '16:57 1/02/2023',
          'status': 0,
        },
        {
          'user': {
            'avatar': '/defaultavatar.jpg',
            'displayname': 'Tên hiển thị'
          },
          'content': 'Chương truyện bị lỗi',
          'createdTime': '16:57 1/02/2023',
          'status': 1,
        },
      ]
      setReports(fetchReports)
    }
  }, [reportIds])

  return (
    <ShowAdminWrapper>
      <div>
        <h1>Id</h1>
        <p>{chapterId}</p>
      </div>
      <div>
        <h1>Manga</h1>
        <div className='admin-chapter-manga-card-wrapper' onClick={() => { if (manga.id) window.location.href = '/admin/manga/show/' + manga.id }}>
          <div className='admin-chapter-manga-card-cover-wrapper'>
            <img className='admin-chapter-manga-card-cover' src={manga ? manga.cover : ''} alt='card-cover' />
          </div>
          <div className='admin-chapter-manga-card-title-wrapper'>
            <p className='admin-chapter-manga-title'>{manga ? manga.title : ''}</p>
          </div>
        </div>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Title</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>{item.title}</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Cover</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <img className='admin-chapter-cover' src={item.cover} alt='chapter-cover' />
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Price</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>{item.price + ' VND'}</p>
      </div>
      <div>
        <h1>UpdateTime</h1>
        <p>{item.updateTime}</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Images</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <div className='chapter-admin-pages-wrapper'>
          {item.images && item.images.map(image => (
            <img className='chapter-admin-pages' src={image} alt='chapter-page' />
          ))}
        </div>
        <div>
          <h1>OwnedUsers</h1>
          <div className='admin-card-list-wrapper'>
            {
              ownedUsers && ownedUsers.map(user => (
                <OwnedUserCard
                  avatar={user.avatar}
                  displayname={user.displayname}
                />
              ))
            }
          </div>
          <div className='admin-show-expand-wrapper'>
            <a href={"/admin/user?searchfield=ownedChapters&searchvalue="+item.id}>{'Mở rộng >'}</a>
          </div>
        </div>
        <div>
          <h1>Reports</h1>
          <div className='admin-card-list-wrapper'>
            {
              reports && reports.map(report => (
                <ChapterReportCard
                  useravatar={report.user.avatar}
                  userdisplayname={report.user.displayname}
                  content={report.content}
                  createdTime={report.createdTime}
                  status={report.status}
                />
              ))
            }
          </div>
          <div className='admin-show-expand-wrapper'>
            <a href={"/admin/report?searchfield=chapter&searchvalue="+item.id}>{'Mở rộng >'}</a>
          </div>
        </div>
      </div>
    </ShowAdminWrapper >
  );
}

export default ChapterAdminShow;
