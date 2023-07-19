import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ShowAdminWrapper from "../component/showadminwrapper/ShowAdminWrapper";
import './CommentAdminShow.css'
import { Add, CircleOutlined, Clear, Edit, } from "@mui/icons-material"
import { IconButton } from "@mui/material";

const iconStyle = {
  'color': '#0099FF',
}

function CommentAdminShow() {
  const params = useParams()

  const [commentId] = useState(params.id)
  const [item, setItem] = useState({})
  const [mangaId, setMangaId] = useState('')
  const [manga, setManga] = useState({})
  const [userId, setUserId] = useState('')
  const [user, setUser] = useState({})

  useEffect(() => {
    let fetchItem = {
      'id': commentId,
      'content': 'Truyện đáng mua!',
      'timeCreated': '16:57 1/02/2023',
      'manga': '1',
      'user': '1'
    }

    setItem(fetchItem)

    setMangaId(fetchItem.chapter)
    setUserId(fetchItem.user)
  }, [])

  useEffect(() => {
    //fetch backend
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

  return (
    <ShowAdminWrapper>
      <div>
        <h1>Id</h1>
        <p>{item.id}</p>
      </div>
      <div>
        <h1>Manga</h1>
        <div className='admin-comment-manga-card-wrapper' onClick={() => { if (manga.id) window.location.href = '/admin/manga/show/' + manga.id }}>
          <div className='admin-comment-manga-card-cover-wrapper'>
            <img className='admin-comment-manga-card-cover' src={manga ? manga.cover : ''} alt='card-cover' />
          </div>
          <div className='admin-comment-manga-card-title-wrapper'>
            <p className='admin-comment-manga-title'>{manga ? manga.title : ''}</p>
          </div>
        </div>
      </div>
      <div>
        <h1>User</h1>
        <div className='comment-admin-user-wrapper' onClick={() => { if (user.id) window.location.href = '/admin/user/show/' + user.id }}>
          <img className='comment-admin-user-avatar' src={user ? user.avatar : ''} alt='user-avatar' />
          <p className='comment-user-displayname'>{user ? user.displayname : ''}</p>
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
    </ShowAdminWrapper>
  );
}

export default CommentAdminShow;
