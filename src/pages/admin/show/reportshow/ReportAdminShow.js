import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ShowAdminWrapper from "../component/showadminwrapper/ShowAdminWrapper";
import './ReportAdminShow.css'
import { Check, Edit, } from "@mui/icons-material"
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
      let apiUrl = process.env.REACT_APP_API_ENDPOINT+'/admin/reports/' + reportId

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
        setItem(json)
        setChapterId(json.chapter)
        setUserId(json.user)
      } else {
        window.location.href = '/admin/report'
      }
    }

    fetchItem()
    // eslint-disable-next-line
  }, [])

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
        const json = await response.json()
        json.id = chapterId
        setChapter(json)
      }
    }

    if (chapterId !== '') {
      fetchChapterReference(chapterId)
    }
    // eslint-disable-next-line
  }, [chapterId])

  useEffect(() => {
    const fetchUserReference = async (userId) => {
      let apiUrl = process.env.REACT_APP_API_ENDPOINT+'/admin/users/reference/' + userId

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
        setUser(json)
      }
    }

    if (userId !== '') {
      fetchUserReference(userId)
    }
    // eslint-disable-next-line
  }, [userId])

  const procResponse = (e) => {
    setIsResponse(!isResponse)
  }

  const handleChangeResponseTextfield = (e) => {
    setResponseEditValue(e.target.value)
  }

  const submitResponse = (e) => {
    const putBackend = async () => {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/admin/reports/' + item.id, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Authorization': sessionkey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'response': responseEditValue,
        })
      })

      if (response.ok) {
        let newItem = {
          ...item,
          'response': responseEditValue,
          'status': 1,
        }
        setItem(newItem)
        procResponse()
      }
    }

    putBackend()
  }

  return (
    <ShowAdminWrapper deleteAPIUrl={process.env.REACT_APP_API_ENDPOINT+'/admin/reports/' + item.id}>
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
