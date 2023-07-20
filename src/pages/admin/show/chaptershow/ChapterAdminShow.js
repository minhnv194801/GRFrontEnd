import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ShowAdminWrapper from "../component/showadminwrapper/ShowAdminWrapper";
import './ChapterAdminShow.css'
import { Add, Check, CircleOutlined, Clear, Edit, } from "@mui/icons-material"
import { IconButton, TextField, TextareaAutosize } from "@mui/material";
import OwnedUserCard from "./ownedusercard/OwnedUserCard";
import ChapterReportCard from "./chapterreportcard/ChapterReportCard";
import { timeConverter } from "../../../../common/Date";

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

function ChapterAdminShow() {
  const MAX_USER_REFERENCE = 20
  const MAX_REPORT_REFERENCE = 20
  const params = useParams()

  const [chapterId] = useState(params.id)
  const [item, setItem] = useState({})
  const [mangaId, setMangaId] = useState("")
  const [manga, setManga] = useState([])
  const [ownedUserIds, setOwnedUserIds] = useState(null)
  const [ownedUsers, setOwnedUsers] = useState([])
  const [reportIds, setReportIds] = useState(null)
  const [reports, setReports] = useState([])

  const [isEditName, setIsEditName] = useState(false)
  const [isEditCover, setIsEditCover] = useState(false)
  const [isEditPrice, setIsEditPrice] = useState(false)
  const [isEditImages, setIsEditImages] = useState(false)

  const [editedNameValue, setEditedNameValue] = useState("")
  const [editedCoverValue, setEditedCoverValue] = useState("")
  const [editedPriceValue, setEditedPriceValue] = useState("")
  const [editedImagesValue, setEditedImagesValue] = useState([])

  useEffect(() => {
    const fetchItem = async () => {
      let apiUrl = 'http://localhost:8081/api/v1/admin/chapters/' + chapterId

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
        json.updateTime = timeConverter(json.updateTime)
        setItem(json)
        setMangaId(json.manga)
        setOwnedUserIds(json.ownedUsers)
        setReportIds(json.reports)
      } else {
        window.location.href = '/admin/chapter'
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
        const json = await response.json()
        console.log(json)
        setManga(json)
      }
    }

    if (mangaId !== '') {
      fetchMangaReference(mangaId)
    }
  }, [mangaId])

  useEffect(() => {
    const fetchUserReference = async (userId) => {
      let apiUrl = 'http://localhost:8081/api/v1/admin/users/reference/' + userId

      const response = await fetch(apiUrl, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        // convert data to json
        const json = await response.json()
        console.log(json)
        return json
      }
    }

    const fetchOwnedUsers = async () => {
      let fetchedOwnedUsers = []
      for (var [index, userId] in ownedUserIds.entries()) {
        if (index >= MAX_USER_REFERENCE) {
          break
        }
        fetchedOwnedUsers[fetchedOwnedUsers.length] = await fetchUserReference(userId)
      }
      setOwnedUsers(fetchedOwnedUsers)
    }

    if (ownedUserIds !== null) {
      fetchOwnedUsers()
    }
  }, [ownedUserIds])

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
        fetchedReports[fetchedReports.length] = await fetchReportReference(reportId)
      }
      setReports(fetchedReports)
    }
    if (reportIds !== null) {
      fetchReports()
    }
  }, [reportIds])

  const procEditName = (e) => {
    setIsEditName(!isEditName)
    setEditedNameValue(item.title)
  }

  const openEditCover = (e) => {
    setIsEditCover(true)
    if (editedCoverValue === '') {
      setEditedCoverValue(item.cover)
    }
  }

  const closeEditCover = (e) => {
    setIsEditCover(false)
    setEditedCoverValue('')
  }

  const procEditPrice = (e) => {
    setIsEditPrice(!isEditPrice)
    setEditedPriceValue(item.price)
  }

  const handleChangeEditName = (e) => {
    setEditedNameValue(e.target.value)
  }

  const handleChangeEditPrice = (e) => {
    setEditedPriceValue(e.target.value)
  }

  const submitEditedName = (e) => {
    //POST to backend
    let newItem = {
      ...item,
      'title': editedNameValue,
    }
    console.log(newItem)
    setItem(newItem)
    procEditName()
  }

  const submitEditedCover = (e) => {
    //POST to backend
    let newItem = {
      ...item,
      'cover': editedCoverValue,
    }
    console.log(newItem)
    setItem(newItem)
    closeEditCover()
  }

  const submitEditedPrice = (e) => {
    //POST to backend
    let newItem = {
      ...item,
      'price': editedPriceValue,
    }
    console.log(newItem)
    setItem(newItem)
    procEditPrice()
  }

  const cancelEditCover = (e) => {
    closeEditCover()
  }

  const onCoverChange = (e) => {
    const file = e.target?.files?.[0];
    if (file) {
      getBase64(file).then((base64) => {
        setEditedCoverValue(base64)
      });
    }
  }

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
          <IconButton onClick={procEditName}>
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        {isEditName ?
          <div className='flex-edit-admin-textfield'>
            <TextField defaultValue={editedNameValue} onChange={handleChangeEditName} />
            <IconButton onClick={submitEditedName}>
              <Check sx={iconStyle} />
            </IconButton>
          </div>
          :
          <p>{item.title}</p>}
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Cover</h1>
          <input
            id='cover-file-input'
            hidden
            onChange={onCoverChange}
            type="file"
            accept="image/png,image/jpeg,image/gif"
          />
          <label htmlFor="cover-file-input">
            <IconButton onClick={openEditCover} component='span'>
              <Edit sx={iconStyle} />
            </IconButton>
          </label>
        </div>
        {isEditCover ?
          <>
            <div className='manga-admin-show-editable-wrapper'>
              <img className='admin-chapter-cover' src={editedCoverValue} alt='manga-cover' />
            </div>
            <IconButton onClick={cancelEditCover}>
              <Clear sx={iconStyle} />
            </IconButton>
            <IconButton onClick={submitEditedCover}>
              <Check sx={iconStyle} />
            </IconButton>
          </>
          :
          <img className='admin-chapter-cover' src={item.cover} alt='manga-cover' />
        }
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Price</h1>
          <IconButton onClick={procEditPrice}>
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        {isEditPrice ?
          <div className='flex-edit-admin-textfield'>
            <TextField type='number' defaultValue={editedPriceValue} onChange={handleChangeEditPrice} />
            <p style={{ marginTop: 'auto' }}>VND</p>
            <IconButton onClick={submitEditedPrice}>
              <Check sx={iconStyle} />
            </IconButton>
          </div>
          :
          <p>{item.price + ' VND'}</p>}
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
            <a href={"/admin/user?searchfield=ownedChapters&searchvalue=" + item.id}>{'Mở rộng >'}</a>
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
            <a href={"/admin/report?searchfield=chapter&searchvalue=" + item.id}>{'Mở rộng >'}</a>
          </div>
        </div>
      </div>
    </ShowAdminWrapper >
  );
}

export default ChapterAdminShow;
