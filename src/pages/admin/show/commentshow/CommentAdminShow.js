import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ShowAdminWrapper from "../component/showadminwrapper/ShowAdminWrapper";
import './CommentAdminShow.css'
import { timeConverter } from "../../../../common/Date";
import { useSelector } from "react-redux";

function CommentAdminShow() {
  const params = useParams()
  const sessionkey = useSelector((state) => state.app.sessionkey)

  const [commentId] = useState(params.id)
  const [item, setItem] = useState({})
  const [mangaId, setMangaId] = useState('')
  const [manga, setManga] = useState({})
  const [userId, setUserId] = useState('')
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchItem = async () => {
      let apiUrl = process.env.API_ENDPOINT+'/admin/comments/' + commentId

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
        setMangaId(json.manga)
        setUserId(json.user)
      } else {
        window.location.href = '/admin/comment'
      }
    }

    fetchItem()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const fetchMangaReference = async (mangaId) => {
      let apiUrl = process.env.API_ENDPOINT+'/admin/mangas/reference/' + mangaId

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
        json.id = mangaId
        setManga(json)
      }
    }

    if (mangaId !== '') {
      fetchMangaReference(mangaId)
    }
    // eslint-disable-next-line
  }, [mangaId])

  useEffect(() => {
    const fetchUserReference = async (userId) => {
      let apiUrl = process.env.API_ENDPOINT+'/admin/users/reference/' + userId

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
        json.id = userId
        setUser(json)
      }
    }

    if (userId !== '') {
      fetchUserReference(userId)
    }
    // eslint-disable-next-line
  }, [userId])

  return (
    <ShowAdminWrapper deleteAPIUrl={process.env.API_ENDPOINT+'/admin/comments/' + item.id}>
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
