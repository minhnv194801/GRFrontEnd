import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ShowAdminWrapper from "../component/showadminwrapper/ShowAdminWrapper";
import './ReportAdminShow.css'
import { Add, Check, CircleOutlined, Clear, Edit, } from "@mui/icons-material"
import { IconButton, TextField } from "@mui/material";
import { timeConverter } from "../../../../common/Date";
import { useSelector } from "react-redux";

const iconStyle = {
  'color': '#0099FF',
}

function ReportAdminShow() {
  const params = useParams()
  const sessionkey = useSelector((state) => state.app.sessionkey)

  const [reportId] = useState(params.id)
  const [item, setItem] = useState({})
  const [chapterId, setChapterId] = useState('')
  const [chapter, setChapter] = useState({})
  const [userId, setUserId] = useState('')
  const [user, setUser] = useState({})
  const [isResponse, setIsResponse] = useState(false)
  const [responseEditValue, setResponseEditValue] = useState('')

  useEffect(() => {
    const fetchItem = async () => {
      let apiUrl = 'http://localhost:8081/api/v1/admin/reports/' + reportId

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
        json.timeCreated = timeConverter(json.timeCreated)
        console.log(json)
        setItem(json)
        setChapterId(json.chapter)
        setUserId(json.user)
      } else {
        window.location.href = '/admin/report'
      }
    }

    fetchItem()
  }, [])

  useEffect(() => {
    const fetchChapterReference = async (chapterId) => {
      let apiUrl = 'http://localhost:8081/api/v1/admin/chapters/reference/' + chapterId

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
        const json = await response.json()
        console.log(json)
        json.id = chapterId
        setChapter(json)
      }
    }

    if (chapterId !== '') {
      fetchChapterReference(chapterId)
    }
  }, [chapterId])

  useEffect(() => {
    const fetchUserReference = async (userId) => {
      let apiUrl = 'http://localhost:8081/api/v1/admin/users/reference/' + userId

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
        const json = await response.json()
        console.log(json)
        setUser(json)
      }
    }

    if (userId !== '') {
      fetchUserReference(userId)
    }
  }, [userId])

  const procResponse = (e) => {
    setIsResponse(!isResponse)
  }

  const handleChangeResponseTextfield = (e) => {
    setResponseEditValue(e.target.value)
  }

  const submitResponse = (e) => {
    //POST to backend
    let newItem = {
      ...item,
      'response': responseEditValue,
      'status': 1,
    }
    console.log(newItem)
    setItem(newItem)
    procResponse()
  }

  return (
    <ShowAdminWrapper>
      <div>
        <h1>Id</h1>
        <p>{item.id}</p>
      </div>
      <div>
        <h1>Chapter</h1>
        <div className='admin-report-chapter-card-wrapper' onClick={() => { if (chapter.id) window.location.href = '/admin/chapter/show/' + chapter.id }}>
          <div className='admin-report-chapter-card-cover-wrapper'>
            <img className='admin-report-chapter-card-cover' src={chapter.cover ? chapter.cover : ''} alt='card-cover' />
          </div>
          <div className='admin-report-chapter-card-title-wrapper'>
            <p className='admin-report-chapter-title'>{chapter.title ? chapter.title : ''}</p>
          </div>
        </div>
      </div>
      <div>
        <h1>User</h1>
        <div className='report-admin-user-wrapper' onClick={() => { if (user.id) window.location.href = '/admin/user/show/' + user.id }}>
          <img className='report-admin-user-avatar' src={user.avatar ? user.avatar : ''} alt='user-avatar' />
          <p className='report-user-displayname'>{user.displayname ? user.displayname : ''}</p>
        </div>
      </div>
      <div>
        <h1>Content</h1>
        <p>{item.content}</p>
      </div>
      <div>
        <h1>TimeCreated</h1>
        <p>{item.timeCreated}</p>
      </div>
      <div>
        <h1>Status</h1>
        {item.status === 0 ? <p className="report-admin-show-unfinished-status">Chưa phản hồi</p> : <p className="report-admin-show-finished-status">Đã phản hồi</p>}
      </div>
      <div>
        {
          item.status === 0 ?
            <div className='manga-admin-show-editable-wrapper'>
              <h1>Response</h1>
              <IconButton onClick={procResponse}>
                <Edit sx={iconStyle} />
              </IconButton>
            </div>
            :
            <h1>Response</h1>
        }
        {isResponse ?
          <div className='flex-edit-admin-textfield'>
            <TextField defaultValue={item.response} onChange={handleChangeResponseTextfield} />
            <IconButton onClick={submitResponse}>
              <Check sx={iconStyle} />
            </IconButton>
          </div>
          :
          <p>{item.response}</p>}
      </div>
    </ShowAdminWrapper>
  );
}

export default ReportAdminShow;
