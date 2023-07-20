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
import { timeConverter } from "../../../../common/Date";

const iconStyle = {
  'color': '#0099FF',
}

function UserAdminShow() {
  const MAX_MANGA_REFERENCE = 20
  const MAX_CHAPTER_REFERENCE = 20
  const MAX_COMMENT_REFERENCE = 20
  const MAX_REPORT_REFERENCE = 20
  const params = useParams()

  const [userId] = useState(params.id)

  const [item, setItem] = useState({})
  const [followMangaIds, setFollowMangaIds] = useState(null)
  const [ownedChapterIds, setOwnedChapterIds] = useState(null)
  const [commentIds, setCommentIds] = useState(null)
  const [reportIds, setReportIds] = useState(null)

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
  }, [])

  useEffect(() => {
    const fetchItem = async () => {
      let apiUrl = 'http://localhost:8081/api/v1/admin/users/' + userId

      const response = await fetch(apiUrl, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        // convert data to json
        const json = await response.json();
        console.log(json)
        setItem(json)
        setFollowMangaIds(json.followMangas)
        setOwnedChapterIds(json.ownedChapters)
        setCommentIds(json.comments)
        setReportIds(json.reports)
      } else {
        window.location.href = '/admin/user'
      }
    }

    fetchItem()
  }, [])

  useEffect(() => {
    const fetchMangaReference = async (mangaId) => {
      let apiUrl = 'http://localhost:8081/api/v1/admin/mangas/reference/' + mangaId

      const response = await fetch(apiUrl, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        // convert data to json
        const json = await response.json();
        return json
      }
    }

    const fetchMangas = async () => {
      let fetchedMangas = []
      for (let [index, mangaId] of followMangaIds.entries()) {
        if (index >= MAX_MANGA_REFERENCE) {
          break
        }
        fetchedMangas[fetchedMangas.length] = await fetchMangaReference(mangaId)
      }
      setFollowMangas(fetchedMangas)
    }

    if (followMangaIds !== null) {
      fetchMangas()
    }
  }, [followMangaIds])

  useEffect(() => {
    const fetchChapterReference = async (chapterId) => {
      let apiUrl = 'http://localhost:8081/api/v1/admin/chapters/reference/' + chapterId

      const response = await fetch(apiUrl, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        // convert data to json
        const json = await response.json();
        return json
      }
    }

    const fetchChapters = async () => {
      let fetchedChapters = []
      for (let [index, chapterId] of ownedChapterIds.entries()) {
        if (index >= MAX_CHAPTER_REFERENCE) {
          break
        }
        console.log(index)
        console.log(chapterId)
        fetchedChapters[fetchedChapters.length] = await fetchChapterReference(chapterId)
      }
      setOwnedChapters(fetchedChapters)
    }

    if (ownedChapterIds !== null) {
      console.log()
      fetchChapters()
    }
  }, [ownedChapterIds])

  useEffect(() => {
    const fetchCommentReference = async (commentId) => {
      let apiUrl = 'http://localhost:8081/api/v1/admin/comments/reference/' + commentId

      const response = await fetch(apiUrl, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        // convert data to json
        const json = await response.json();
        return json
      }
    }

    const fetchComments = async () => {
      let fetchedComments = []
      for (let [index, commentId] of commentIds.entries()) {
        if (index >= MAX_COMMENT_REFERENCE) {
          break
        }
        let comment = await fetchCommentReference(commentId)
        comment.timeCreated = timeConverter(comment.timeCreated)
        fetchedComments[fetchedComments.length] = comment
      }
      setComments(fetchedComments)
    }

    if (commentIds !== null) {
      fetchComments()
    }
  }, [commentIds])

  useEffect(() => {
    const fetchReportReference = async (reportId) => {
      let apiUrl = 'http://localhost:8081/api/v1/admin/reports/reference/' + reportId

      const response = await fetch(apiUrl, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        // convert data to json
        const json = await response.json();
        return json
      }
    }

    const fetchReports = async () => {
      let fetchedReports = []
      for (let [index, reportId] of reportIds.entries()) {
        if (index >= MAX_REPORT_REFERENCE) {
          break
        }
        let report = await fetchReportReference(reportId)
        report.timeCreated = timeConverter(report.timeCreated)
        fetchedReports[fetchedReports.length] = report
      }
      console.log(fetchedReports)
      setReports(fetchedReports)
    }

    if (reportIds !== null) {
      fetchReports()
    }
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
    <ShowAdminWrapper deleteAPIUrl={'http://localhost:8081/api/v1/admin/users/' + item.id}>
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
          <a href={"/admin/manga?searchfield=followedUsers&searchvalue=" + item.id}>{'Mở rộng >'}</a>
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
          <a href={"/admin/chapter?searchfield=ownedUsers&searchvalue=" + item.id}>{'Mở rộng >'}</a>
        </div>
      </div>
      <div>
        <h1>Comments</h1>
        <div className="admin-card-list-wrapper">
          {
            comments && comments.map((comment) => (
              <UserCommentCard
                mangaCover={comment.manga && comment.manga.cover}
                mangaTitle={comment.manga && comment.manga.title}
                content={comment.content}
                updateTime={comment.timeCreated}
              />
            ))
          }
        </div>
        <div className='admin-show-expand-wrapper'>
          <a href={"/admin/comment?searchfield=user&searchvalue=" + item.id}>{'Mở rộng >'}</a>
        </div>
      </div>
      <div>
        <h1>Reports</h1>
        <div className="admin-card-list-wrapper">
          {
            reports && reports.map((report) => (
              <UserReportCard
                chapterCover={report.chapter && report.chapter.cover}
                chapterTitle={report.chapter && report.chapter.title}
                content={report.content}
                updateTime={report.timeCreated}
                status={report.status}
              />
            ))
          }
        </div>
        <div className='admin-show-expand-wrapper'>
          <a href={"/admin/report?searchfield=user&searchvalue=" + item.id}>{'Mở rộng >'}</a>
        </div>
      </div>
    </ShowAdminWrapper >
  );
}

export default UserAdminShow;
