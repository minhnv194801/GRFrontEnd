import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ShowAdminWrapper from "../component/showadminwrapper/ShowAdminWrapper";
import './ReportAdminShow.css'
import { Add, Check, CircleOutlined, Clear, Edit, } from "@mui/icons-material"
import { IconButton, TextField } from "@mui/material";

const iconStyle = {
  'color': '#0099FF',
}

function ReportAdminShow() {
  const params = useParams()

  const [reportId] = useState(params.id)
  const [item, setItem] = useState({})
  const [chapterId, setChapterId] = useState('')
  const [chapter, setChapter] = useState({})
  const [userId, setUserId] = useState('')
  const [user, setUser] = useState({})
  const [isResponse, setIsResponse] = useState(false)
  const [responseEditValue, setResponseEditValue] = useState('')

  useEffect(() => {
    //fetch backend
    let fetchItem = {
      'id': reportId,
      'content': 'Chương truyện bị lỗi',
      'timeCreated': '16:57 1/02/2023',
      'status': 0,
      'response': '',
      'chapter': '1',
      'user': '1'
    }

    setItem(fetchItem)

    setChapterId(fetchItem.chapter)
    setUserId(fetchItem.user)
  }, [])

  useEffect(() => {
    //fetch backend
    if (chapterId !== '') {
      let fetchChapter = {
        'id': '1',
        'cover': '/chaptericon.jpg',
        'title': 'Chapter'
      }
      setChapter(fetchChapter)
    }
  }, [chapterId])

  useEffect(() => {
    //fetch backend
    if (userId !== '') {
      let fetchUser = {
        'id': '1',
        'avatar': '/defaultavatar.jpg',
        'displayname': 'Tên hiển thị'
      }
      setUser(fetchUser)
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
