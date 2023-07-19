import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ShowAdminWrapper from "../component/showadminwrapper/ShowAdminWrapper";
import './UserAdminShow.css'
import { Add, CircleOutlined, Clear, Edit, } from "@mui/icons-material"
import { IconButton } from "@mui/material";
import UserCommentCard from "./usercommentcard/UserCommentCard";
import OwnedChapterCard from "./ownedchaptercard/OwnedChapterCard";
import FollowMangaCard from "./followmangacard/FollowMangaCard";
import UserReportCard from "./userreportcard/UserReportCard";

const iconStyle = {
  'color': '#0099FF',
}

function UserAdminShow() {
  const params = useParams()

  const [userId] = useState(params.id)

  const [item, setItem] = useState({})
  const [followMangaIds, setFollowMangaIds] = useState([])
  const [ownedChapterIds, setOwnedChapterIds] = useState([])
  const [commentIds, setCommentIds] = useState([])
  const [reportIds, setReportIds] = useState([])

  const [followMangas, setFollowMangas] = useState([])
  const [ownedChapters, setOwnedChapters] = useState([])
  const [comments, setComments] = useState([])
  const [reports, setReports] = useState([])

  useEffect(() => {
    let fetchItem = {
      'id': userId,
      'email': 'email@email.com',
      'password': '$2a$14$TS7aakGm9DIBS2iUvWHNSe4xzh57oJfy34Y/nVnrTtF923bpcw09C',
      'role': 'Người dùng',
      'displayname': 'Tên hiển thị',
      'avatar': '/defaultavatar.jpg',
      'firstName': 'Tên',
      'lastName': 'Họ',
      'gender': 0,
      'followMangas': ['1'],
      'ownedChapters': ['1'],
      'comments': ['1'],
      'reports': ['1']
    }

    setItem(fetchItem)
    setFollowMangaIds(fetchItem.followMangas)
    setOwnedChapterIds(fetchItem.ownedChapters)
    setCommentIds(fetchItem.comments)
    setReportIds(fetchItem.reports)
  }, [])

  useEffect(() => {
    let fetchMangas = [
      {
        'cover': '/mangaicon.jpg',
        'title': 'Manga'
      },
      {
        'cover': '/mangaicon.jpg',
        'title': 'Manga'
      },
      {
        'cover': '/mangaicon.jpg',
        'title': 'Manga'
      },
      {
        'cover': '/mangaicon.jpg',
        'title': 'Manga'
      },
      {
        'cover': '/mangaicon.jpg',
        'title': 'Manga'
      },
    ]
    setFollowMangas(fetchMangas)
  }, [followMangaIds])

  useEffect(() => {
    let fetchChapters = [
      {
        'cover': '/chaptericon.jpg',
        'title': 'Chapter'
      },
      {
        'cover': '/chaptericon.jpg',
        'title': 'Chapter'
      },
      {
        'cover': '/chaptericon.jpg',
        'title': 'Chapter'
      },
      {
        'cover': '/chaptericon.jpg',
        'title': 'Chapter'
      },
      {
        'cover': '/chaptericon.jpg',
        'title': 'Chapter'
      },
    ]

    setOwnedChapters(fetchChapters)
  }, [ownedChapterIds])

  useEffect(() => {
    let fetchComments = [
      {
        'manga': {
          'cover': '/mangaicon.jpg',
          'title': 'Manga',
        },
        'content': 'Truyện hay!',
        'timeCreated': '16:57 1/02/2023',
      },
      {
        'manga': {
          'cover': '/mangaicon.jpg',
          'title': 'Manga',
        },
        'content': 'Truyện hay!',
        'timeCreated': '16:57 1/02/2023',
      },
      {
        'manga': {
          'cover': '/mangaicon.jpg',
          'title': 'Manga',
        },
        'content': 'Truyện hay!',
        'timeCreated': '16:57 1/02/2023',
      },
      {
        'manga': {
          'cover': '/mangaicon.jpg',
          'title': 'Manga',
        },
        'content': 'Truyện hay!',
        'timeCreated': '16:57 1/02/2023',
      },
      {
        'manga': {
          'cover': '/mangaicon.jpg',
          'title': 'Manga',
        },
        'content': 'Truyện hay!',
        'timeCreated': '16:57 1/02/2023',
      },
    ]
    setComments(fetchComments)
  }, [commentIds])

  useEffect(() => {
    let fetchReports = [
      {
        'chapter': {
          'cover': '/chaptericon.jpg',
          'title': 'Chapter',
        },
        'content': 'Ảnh truyện bị lổi rồi',
        'timeCreated': '16:57 1/02/2023',
        'status': 0,
      },
      {
        'chapter': {
          'cover': '/chaptericon.jpg',
          'title': 'Chapter',
        },
        'content': 'Ảnh truyện bị lổi rồi',
        'timeCreated': '16:57 1/02/2023',
        'status': 1,
      },
      {
        'chapter': {
          'cover': '/chaptericon.jpg',
          'title': 'Chapter',
        },
        'content': 'Ảnh truyện bị lổi rồi',
        'timeCreated': '16:57 1/02/2023',
        'status': 1,
      },
    ]
    setReports(fetchReports)
  }, [reportIds])

  const renderGender = () => {
    switch (item.gender) {
      case 1:
        return (<p>Nữ</p>)
      case 2:
        return (<p>Không xác định</p>)
      default:
        return (<p>Nam</p>)
    }
  }

  return (
    <ShowAdminWrapper>
      <div>
        <h1>Id</h1>
        <p>{item.id}</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Email</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>{item.email}</p>
      </div>
      <div>
        <h1>Password</h1>
        <p>{item.password}</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Role</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>{item.role}</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>DisplayName</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>{item.displayname}</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Avatar</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <img className='user-admin-show-avatar' src={item.avatar} alt='user-avatar' />
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>FirstName</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>{item.firstName}</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>LastName</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>{item.lastName}</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Gender</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>{renderGender()}</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>FollowMangas</h1>
        </div>
        <div className="admin-card-list-wrapper">
          {followMangas && followMangas.map(manga => (
            <FollowMangaCard
              cover={manga.cover}
              content={manga.title}
            />
          ))}
        </div>
        <div className='admin-show-expand-wrapper'>
          <a href={"/admin/manga?searchfield=followedUsers&searchvalue="+item.id}>{'Mở rộng >'}</a>
        </div>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>OwnedChapters</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <div className="admin-card-list-wrapper">
          {
            ownedChapters && ownedChapters.map(chapter => (
              <OwnedChapterCard
                cover={chapter.cover}
                content={chapter.title}
              />
            ))
          }
        </div>
        <div className='admin-show-expand-wrapper'>
          <a href={"/admin/chapter?searchfield=ownedUsers&searchvalue="+item.id}>{'Mở rộng >'}</a>
        </div>
      </div>
      <div>
        <h1>Comments</h1>
        <div className="admin-card-list-wrapper">
          {
            comments && comments.map((comment) => (
              <UserCommentCard
                mangaCover={comment.manga.cover}
                mangaTitle={comment.manga.title}
                content={comment.content}
                updateTime={comment.timeCreated}
              />
            ))
          }
        </div>
        <div className='admin-show-expand-wrapper'>
          <a href={"/admin/comment?searchfield=user&searchvalue="+item.id}>{'Mở rộng >'}</a>
        </div>
      </div>
      <div>
        <h1>Reports</h1>
        <div className="admin-card-list-wrapper">
          {
            reports && reports.map((report) => (
              <UserReportCard
                chapterCover={report.chapter.cover}
                chapterTitle={report.chapter.title}
                content={report.content}
                updateTime={report.timeCreated}
                status={report.status}
              />
            ))
          }
        </div>
        <div className='admin-show-expand-wrapper'>
          <a href={"/admin/report?searchfield=user&searchvalue="+item.id}>{'Mở rộng >'}</a>
        </div>
      </div>
    </ShowAdminWrapper >
  );
}

export default UserAdminShow;
