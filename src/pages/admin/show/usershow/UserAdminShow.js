import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ShowAdminWrapper from "../component/showadminwrapper/ShowAdminWrapper";
import './UserAdminShow.css'
import { Check, Clear, Edit, } from "@mui/icons-material"
import { IconButton, TextField } from "@mui/material";
import UserCommentCard from "./usercommentcard/UserCommentCard";
import OwnedChapterCard from "./ownedchaptercard/OwnedChapterCard";
import FollowMangaCard from "./followmangacard/FollowMangaCard";
import UserReportCard from "./userreportcard/UserReportCard";
import { timeConverter } from "../../../../common/Date";
import { useSelector } from "react-redux";

const iconStyle = {
  'color': '#0099FF',
}

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      reject(error)
    };
  })
}

function UserAdminShow() {
  const MAX_MANGA_REFERENCE = 20
  const MAX_CHAPTER_REFERENCE = 20
  const MAX_COMMENT_REFERENCE = 20
  const MAX_REPORT_REFERENCE = 20
  const params = useParams()
  const sessionkey = useSelector((state) => state.app.sessionkey)

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

  const [isEditRole, setIsEditRole] = useState(false)
  const [isEditDisplayName, setIsEditDisplayName] = useState(false)
  const [isEditAvatar, setIsEditAvatar] = useState(false)
  const [isEditFirstName, setIsEditFirstName] = useState(false)
  const [isEditLastName, setIsEditLastName] = useState(false)
  const [isEditGender, setIsEditGender] = useState(false)

  const [editedRoleValue, setEditedRoleValue] = useState("")
  const [editedDisplayName, setEditedDisplayName] = useState("")
  const [editedAvatar, setEditedAvatar] = useState("")
  const [editedFirstName, setEditedFirstName] = useState("")
  const [editedLastName, setEditedLastName] = useState("")
  const [editedGender, setEditedGender] = useState()

  useEffect(() => {
    const fetchItem = async () => {
      let apiUrl = process.env.REACT_APP_API_ENDPOINT+'/admin/users/' + userId

      const response = await fetch(apiUrl, {
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
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const fetchMangaReference = async (mangaId) => {
      let apiUrl = process.env.REACT_APP_API_ENDPOINT+'/admin/mangas/reference/' + mangaId

      const response = await fetch(apiUrl, {
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
    // eslint-disable-next-line
  }, [followMangaIds])

  useEffect(() => {
    const fetchChapterReference = async (chapterId) => {
      let apiUrl = process.env.REACT_APP_API_ENDPOINT+'/admin/chapters/reference/' + chapterId

      const response = await fetch(apiUrl, {
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
    // eslint-disable-next-line
  }, [ownedChapterIds])

  useEffect(() => {
    const fetchCommentReference = async (commentId) => {
      let apiUrl = process.env.REACT_APP_API_ENDPOINT+'/admin/comments/reference/' + commentId

      const response = await fetch(apiUrl, {
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
    // eslint-disable-next-line
  }, [commentIds])

  useEffect(() => {
    const fetchReportReference = async (reportId) => {
      let apiUrl = process.env.REACT_APP_API_ENDPOINT+'/admin/reports/reference/' + reportId

      const response = await fetch(apiUrl, {
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
    // eslint-disable-next-line
  }, [reportIds])

  const procEditRole = (e) => {
    setIsEditRole(!isEditRole)
    setEditedRoleValue(item.role)
  }

  const procEditDisplayName = (e) => {
    setIsEditDisplayName(!isEditDisplayName)
    setEditedDisplayName(item.displayname)
  }

  const procEditFirstName = (e) => {
    setIsEditFirstName(!isEditFirstName)
    setEditedFirstName(item.firstname)
  }

  const procEditLastName = (e) => {
    setIsEditLastName(!isEditLastName)
    setEditedLastName(item.lastname)
  }

  const procEditGender = (e) => {
    setIsEditGender(!isEditGender)
    setEditedGender(item.gender)
  }

  const handleChangeEditRoleValue = (e) => {
    setEditedRoleValue(e.target.value)
  }

  const handleChangeEditFirstName = (e) => {
    setEditedFirstName(e.target.value)
  }

  const handleChangeEditLastName = (e) => {
    setEditedLastName(e.target.value)
  }

  const openEditAvatar = (e) => {
    setIsEditAvatar(true)
    if (editedAvatar === '') {
      setEditedAvatar(item.avatar)
    }
  }

  const closeEditAvatar = (e) => {
    setIsEditAvatar(false)
    setEditedAvatar('')
  }

  const cancelEditAvatar = (e) => {
    closeEditAvatar()
  }

  const handleChangeEditDisplayName = (e) => {
    setEditedDisplayName(e.target.value)
  }

  const handleChangeEditGender = (e) => {
    setEditedGender(e.target.value)
  }

  const onAvatarChange = (e) => {
    const file = e.target?.files?.[0];
    if (file) {
      getBase64(file).then((base64) => {
        setEditedAvatar(base64)
      });
    }
  }

  const submitEditedDisplayName = (e) => {
    const putBackend = async () => {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/admin/users/' + item.id, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Authorization': sessionkey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'displayName': editedDisplayName,
        })
      })

      if (response.ok) {
        let newItem = {
          ...item,
          'displayname': editedDisplayName,
        }
        setItem(newItem)
        procEditDisplayName()
      }
    }

    putBackend()
  }

  const submitEditedFirstName = (e) => {
    const putBackend = async () => {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/admin/users/' + item.id, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Authorization': sessionkey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'firstName': editedFirstName,
        })
      })

      if (response.ok) {
        let newItem = {
          ...item,
          'firstName': editedFirstName,
        }
        console.log(newItem)
        procEditFirstName()
      }
    }

    putBackend()
  }

  const submitEditedLastName = (e) => {
    const putBackend = async () => {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/admin/users/' + item.id, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Authorization': sessionkey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'lastName': editedLastName,
        })
      })

      if (response.ok) {
        let newItem = {
          ...item,
          'lastName': editedLastName,
        }
        console.log(newItem)
        procEditLastName()
      }
    }

    putBackend()
  }

  const submitEditedRole = (e) => {
    const putBackend = async () => {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/admin/users/' + item.id, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Authorization': sessionkey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'role': editedRoleValue,
        })
      })

      if (response.ok) {
        let newItem = {
          ...item,
          'role': editedRoleValue,
        }
        setItem(newItem)
        procEditRole()
      }
    }

    putBackend()
  }

  const submitEditedGender = (e) => {
    const putBackend = async () => {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/admin/users/' + item.id, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Authorization': sessionkey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'gender': parseInt(editedGender),
        })
      })

      if (response.ok) {
        let newItem = {
          ...item,
          'gender': parseInt(editedGender),
        }
        setItem(newItem)
        procEditGender()
      }
    }

    putBackend()
  }

  const submitEditedAvatar = (e) => {
    const putBackend = async () => {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/admin/users/' + item.id, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Authorization': sessionkey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'avatar': editedAvatar
        })
      })

      if (response.ok) {
        let newItem = {
          ...item,
          'avatar': editedAvatar,
        }
        setItem(newItem)
        closeEditAvatar()
      }
    }

    putBackend()
  }

  const renderGender = (genderValue) => {
    switch (parseInt(genderValue)) {
      case 1:
        return (<p>Nữ</p>)
      case 2:
        return (<p>Không xác định</p>)
      default:
        return (<p>Nam</p>)
    }
  }

  return (
    <ShowAdminWrapper deleteAPIUrl={process.env.REACT_APP_API_ENDPOINT+'/admin/users/' + item.id}>
      <div>
        <h1>Id</h1>
        <p>{item.id}</p>
      </div>
      <div>
        <h1>Email</h1>
        <p>{item.email}</p>
      </div>
      <div>
        <h1>Password</h1>
        <p>{item.password}</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Role</h1>
          <IconButton onClick={procEditRole}>
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        {isEditRole ?
          <div className='flex-edit-admin-textfield'>
            <select id="role" defaultValue={item.gender} onChange={handleChangeEditRoleValue}>
              <option value={'Người dùng'}>Người dùng</option>
              <option value={'Quản trị viên'}>Quản trị viên</option>
            </select>
            <IconButton onClick={submitEditedRole}>
              <Check sx={iconStyle} />
            </IconButton>
          </div>
          :
          <p>{item.role}</p>
        }
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>DisplayName</h1>
          <IconButton onClick={procEditDisplayName}>
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        {isEditDisplayName ?
          <div className='flex-edit-admin-textfield'>
            <TextField defaultValue={editedDisplayName} onChange={handleChangeEditDisplayName} />
            <IconButton onClick={submitEditedDisplayName}>
              <Check sx={iconStyle} />
            </IconButton>
          </div>
          :
          <p>{item.displayname}</p>}
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Avatar</h1>
          <input
            id='avatar-file-input'
            hidden
            onChange={onAvatarChange}
            type="file"
            accept="image/png,image/jpeg,image/gif"
          />
          <label htmlFor="avatar-file-input">
            <IconButton onClick={openEditAvatar} component='span'>
              <Edit sx={iconStyle} />
            </IconButton>
          </label>
        </div>
        {isEditAvatar ?
          <>
            <div className='manga-admin-show-editable-wrapper'>
              <img className='user-admin-show-avatar' src={editedAvatar} alt='user-avatar' />
            </div>
            <IconButton onClick={cancelEditAvatar}>
              <Clear sx={iconStyle} />
            </IconButton>
            <IconButton onClick={submitEditedAvatar}>
              <Check sx={iconStyle} />
            </IconButton>
          </>
          :
          <img className='user-admin-show-avatar' src={item.avatar} alt='user-avatar' />
        }
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>FirstName</h1>
          <IconButton onClick={procEditFirstName}>
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        {isEditFirstName ?
          <div className='flex-edit-admin-textfield'>
            <TextField defaultValue={editedFirstName} onChange={handleChangeEditFirstName} />
            <IconButton onClick={submitEditedFirstName}>
              <Check sx={iconStyle} />
            </IconButton>
          </div>
          :
          <p>{item.firstname}</p>}
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>LastName</h1>
          <IconButton onClick={procEditLastName}>
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        {isEditLastName ?
          <div className='flex-edit-admin-textfield'>
            <TextField defaultValue={editedLastName} onChange={handleChangeEditLastName} />
            <IconButton onClick={submitEditedLastName}>
              <Check sx={iconStyle} />
            </IconButton>
          </div>
          :
          <p>{item.lastname}</p>}
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Gender</h1>
          <IconButton onClick={procEditGender}>
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        {isEditGender ?
          <div className='flex-edit-admin-textfield'>
            <select id="gender" defaultValue={item.gender} onChange={handleChangeEditGender}>
              <option value={0}>Nam</option>
              <option value={1}>Nữ</option>
              <option value={2}>Không xác định</option>
            </select>
            <IconButton onClick={submitEditedGender}>
              <Check sx={iconStyle} />
            </IconButton>
          </div>
          :
          <p>{renderGender(item.gender)}</p>
        }
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
