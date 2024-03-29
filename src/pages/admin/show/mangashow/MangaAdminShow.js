import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ShowAdminWrapper from "../component/showadminwrapper/ShowAdminWrapper";
import { Add, Check, CircleOutlined, Clear, Edit, } from "@mui/icons-material";
import FollowUserCard from "./followusercard/FollowUserCard";
import MangaChapterCard from "./mangachaptercard/MangaChapterCard";
import MangaCommentCard from "./mangacommentcard/MangaCommentCard";
import { IconButton, TextField } from "@mui/material";
import { timeConverter } from "../../../../common/Date";
import { useSelector } from "react-redux";
import CONFIG from "../../../../common/Config"
import './MangaAdminShow.css'

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

function MangaAdminShow() {
  const MAX_USER_REFERENCE = 20
  const MAX_CHAPTER_REFERENCE = 20
  const MAX_COMMENT_REFERENCE = 20
  const params = useParams()
  const sessionkey = useSelector((state) => state.app.sessionkey)

  const [mangaId] = useState(params.id)
  const [item, setItem] = useState({})
  const [followedUserIds, setFollowedUserIds] = useState(null)
  const [followedUsers, setFollowedUsers] = useState([])
  const [chapterIds, setChapterIds] = useState(null)
  const [chapters, setChapters] = useState([])
  const [commentIds, setCommentIds] = useState(null)
  const [comments, setComments] = useState([])

  const [isEditName, setIsEditName] = useState(false)
  const [isEditAlternateNames, setIsEditAlternateNames] = useState(false)
  const [isEditAuthor, setIsEditAuthor] = useState(false)
  const [isEditCover, setIsEditCover] = useState(false)
  const [isEditDescription, setIsEditDescription] = useState(false)
  const [isEditStatus, setIsEditStatus] = useState(false)
  const [isEditRecommended, setIsEditRecommended] = useState(false)
  const [isEditTags, setIsEditTags] = useState(false)

  const [editedNameValue, setEditedNameValue] = useState("")
  const [editedAlternateNamesValue, setEditedAlternateNamesValue] = useState([])
  const [editedAuthorValue, setEditedAuthorValue] = useState("")
  const [editedCoverValue, setEditedCoverValue] = useState("")
  const [editedDescriptionValue, setEditedDescriptionValue] = useState("")
  const [editedStatusValue, setEditedStatusValue] = useState(false)
  const [editedRecommendedValue, setEditedRecommendedValue] = useState(false)
  const [editedTagsValue, setEditedTagsValue] = useState([])

  useEffect(() => {
    const fetchItem = async () => {
      let apiUrl = process.env.REACT_APP_API_ENDPOINT+'/admin/mangas/' + mangaId

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
        json.updateTime = timeConverter(json.updateTime)
        setItem(json)
        setFollowedUserIds(json.followedUsers)
        setChapterIds(json.chapters)
        setCommentIds(json.comments)
      } else {
        window.location.href = '/admin/manga'
      }
    }

    fetchItem()
    // eslint-disable-next-line
  }, [])

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
        return json
      }
    }

    const fetchFollowedUsers = async () => {
      let fetchedFollowedUsers = []
      for (var [index, userId] in followedUserIds.entries()) {
        if (index >= MAX_USER_REFERENCE) {
          break
        }
        fetchedFollowedUsers[fetchedFollowedUsers.length] = await fetchUserReference(userId)
      }
      setFollowedUsers(fetchedFollowedUsers)
    }

    if (followedUserIds !== null) {
      fetchFollowedUsers()
    }
    // eslint-disable-next-line
  }, [followedUserIds])

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
      for (let [index, chapterId] of chapterIds.entries()) {
        if (index >= MAX_CHAPTER_REFERENCE) {
          break
        }
        fetchedChapters[fetchedChapters.length] = await fetchChapterReference(chapterId)
      }
      setChapters(fetchedChapters)
    }

    if (chapterIds !== null) {
      fetchChapters()
    }
    // eslint-disable-next-line
  }, [chapterIds])

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
        fetchedComments[fetchedComments.length] = await fetchCommentReference(commentId)
      }
      setComments(fetchedComments)
    }
    if (commentIds !== null) {
      fetchComments()
    }
    // eslint-disable-next-line
  }, [commentIds])

  const procEditName = (e) => {
    setIsEditName(!isEditName)
    setEditedNameValue(item.name)
  }

  const procEditAlternateNames = (e) => {
    setIsEditAlternateNames(!isEditAlternateNames)
    setEditedAlternateNamesValue(item.alternateNames)
  }

  const procEditAuthor = (e) => {
    setIsEditAuthor(!isEditAuthor)
    setEditedAuthorValue(item.author)
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

  const procEditDescription = (e) => {
    setIsEditDescription(!isEditDescription)
    setEditedDescriptionValue(item.description)
  }

  const procEditStatus = (e) => {
    setIsEditStatus(!isEditStatus)
    setEditedDescriptionValue(item.description)
  }

  const procEditRecommend = (e) => {
    setIsEditRecommended(!isEditRecommended)
    setEditedRecommendedValue(item.isRecommended)
  }

  const procEditTags = (e) => {
    setIsEditTags(!isEditTags)
    setEditedTagsValue(item.tags)
  }

  const handleChangeEditName = (e) => {
    setEditedNameValue(e.target.value)
  }

  const handleChangeEditAuthor = (e) => {
    setEditedAuthorValue(e.target.value)
  }

  const handleChangeEditDescription = (e) => {
    setEditedDescriptionValue(e.target.value)
  }

  const handleChangeEditStatus = (e) => {
    setEditedStatusValue(parseInt(e.target.value))
  }

  const handleChangeEditRecommend = (e) => {
    setEditedRecommendedValue(e.target.value === '0' ? false : true)
  }

  const handleChangeEditTag = (value, index) => {
    let selectedTags = [...editedTagsValue]
    selectedTags[index] = value
    setEditedTagsValue(selectedTags)
  }

  const handleChangeAltNames = (value, index) => {
    let newEditedAltName = [...editedAlternateNamesValue]
    newEditedAltName[index] = value
    setEditedAlternateNamesValue(newEditedAltName)
  }

  const addEditedTag = (e) => {
    let availableTags = CONFIG.TAG_LIST.filter(value => !editedTagsValue.includes(value))
    if (availableTags.length > 0) {
      let newEditTagValues = [...editedTagsValue]
      newEditTagValues[newEditTagValues.length] = availableTags[0]
      setEditedTagsValue(newEditTagValues)
    }
  }

  const removeEditedTag = (index) => {
    let selectedTags = [...editedTagsValue]
    selectedTags.splice(index, 1)
    setEditedTagsValue(selectedTags)
  }

  const removeEditedAltName = (index) => {
    let newEditedAltName = [...editedAlternateNamesValue]
    newEditedAltName.splice(index, 1)
    setEditedAlternateNamesValue(newEditedAltName)
  }

  const addEditedAltName = (e) => {
    let newEditedAltName = [...editedAlternateNamesValue]
    newEditedAltName[newEditedAltName.length] = ''
    setEditedAlternateNamesValue(newEditedAltName)
  }

  const submitEditedName = (e) => {
    const putBackend = async () => {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/admin/mangas/' + item.id, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Authorization': sessionkey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'name': editedNameValue,
        })
      })

      if (response.ok) {
        let newItem = {
          ...item,
          'name': editedNameValue,
        }
        setItem(newItem)
        procEditName()
      }
    }

    putBackend()

  }

  const submitEditedAuthor = (e) => {
    const putBackend = async () => {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/admin/mangas/' + item.id, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Authorization': sessionkey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'author': editedAuthorValue,
        })
      })

      if (response.ok) {
        let newItem = {
          ...item,
          'author': editedAuthorValue,
        }
        setItem(newItem)
        procEditAuthor()
      }
    }

    putBackend()
  }

  const submitEditedCover = (e) => {
    const putBackend = async () => {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/admin/mangas/' + item.id, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Authorization': sessionkey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'cover': editedCoverValue,
        })
      })

      if (response.ok) {
        let newItem = {
          ...item,
          'cover': editedCoverValue,
        }
        setItem(newItem)
        closeEditCover()
      }
    }

    putBackend()
  }

  const cancelEditCover = (e) => {
    closeEditCover()
  }

  const submitEditedDescription = (e) => {
    const putBackend = async () => {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/admin/mangas/' + item.id, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Authorization': sessionkey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'description': editedDescriptionValue,
        })
      })

      if (response.ok) {
        let newItem = {
          ...item,
          'description': editedDescriptionValue,
        }
        setItem(newItem)
        procEditDescription()
      }
    }

    putBackend()
  }

  const submitEditedStatus = (e) => {
    const putBackend = async () => {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/admin/mangas/' + item.id, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Authorization': sessionkey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'status': parseInt(editedStatusValue),
        })
      })

      if (response.ok) {
        let newItem = {
          ...item,
          'status': editedStatusValue,
        }
        setItem(newItem)
        procEditStatus()
      }
    }

    putBackend()
  }

  const submitEditedRecommend = (e) => {
    const putBackend = async () => {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/admin/mangas/' + item.id, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Authorization': sessionkey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'isRecommended': editedRecommendedValue,
        })
      })

      if (response.ok) {
        let newItem = {
          ...item,
          'isRecommended': editedRecommendedValue,
        }
        setItem(newItem)
        procEditRecommend()
      }
    }

    putBackend()
  }

  const submitEditedTags = (e) => {
    const putBackend = async () => {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/admin/mangas/' + item.id, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Authorization': sessionkey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'tags': editedTagsValue.sort(),
        })
      })

      if (response.ok) {
        let newItem = {
          ...item,
          'tags': editedTagsValue.sort(),
        }
        setItem(newItem)
        procEditTags()
      }
    }

    putBackend()
  }

  const submitEditedAltNames = (e) => {
    const putBackend = async () => {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/admin/mangas/' + item.id, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Authorization': sessionkey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'alternateName': editedAlternateNamesValue.filter(item => item.trim() !== ''),
        })
      })

      if (response.ok) {
        let newItem = {
          ...item,
          'alternateNames': editedAlternateNamesValue.filter(item => item.trim() !== ''),
        }
        setItem(newItem)
        procEditAlternateNames()
      }
    }

    putBackend()
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
    <ShowAdminWrapper deleteAPIUrl={process.env.REACT_APP_API_ENDPOINT+'/admin/mangas/' + item.id}>
      <div>
        <h1>Id</h1>
        <p>{item.id}</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Name</h1>
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
          <p>{item.name}</p>}
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>AlternateNames</h1>
          <IconButton onClick={procEditAlternateNames}>
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        {
          isEditAlternateNames ?
            <div
              style={{
                'display': 'flex',
                'flexDirection': 'column',
                'gap': '30px',
                'maxWidth': '200px'
              }}>
              {
                editedAlternateNamesValue.map((editedAltName, index) => (
                  <div className="manga-admin-show-editable-wrapper">
                    <TextField
                      value={editedAltName}
                      onChange={(e) => handleChangeAltNames(e.target.value, index)}
                    />
                    <IconButton onClick={(e) => removeEditedAltName(index)}>
                      <Clear sx={iconStyle} />
                    </IconButton>
                  </div>
                ))
              }
              <IconButton onClick={addEditedAltName}>
                <Add sx={iconStyle} />
              </IconButton>
              <IconButton onClick={submitEditedAltNames}>
                <Check sx={iconStyle} />
              </IconButton>
            </div>
            :
            <>
              {
                item.alternateNames && item.alternateNames.map((alternateName) => (
                  <p>{alternateName}</p>
                ))
              }
            </>
        }
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Author</h1>
          <IconButton onClick={procEditAuthor}>
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        {isEditAuthor ?
          <div className='flex-edit-admin-textfield'>
            <TextField defaultValue={editedAuthorValue} onChange={handleChangeEditAuthor} />
            <IconButton onClick={submitEditedAuthor}>
              <Check sx={iconStyle} />
            </IconButton>
          </div>
          :
          <p>{item.author}</p>}
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
              <img className='manga-admin-cover' src={editedCoverValue} alt='manga-cover' />
            </div>
            <IconButton onClick={cancelEditCover}>
              <Clear sx={iconStyle} />
            </IconButton>
            <IconButton onClick={submitEditedCover}>
              <Check sx={iconStyle} />
            </IconButton>
          </>
          :
          <img className='manga-admin-cover' src={item.cover} alt='manga-cover' />
        }
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Description</h1>
          <IconButton onClick={procEditDescription}>
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        {isEditDescription ?
          <div className='flex-edit-admin-textfield'>
            <TextField defaultValue={editedDescriptionValue} onChange={handleChangeEditDescription} />
            <IconButton onClick={submitEditedDescription}>
              <Check sx={iconStyle} />
            </IconButton>
          </div>
          :
          <p>{item.description}</p>}
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Status</h1>
          <IconButton onClick={procEditStatus}>
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        {isEditStatus ?
          <div className='flex-edit-admin-textfield'>
            <select id="status" defaultValue={item.status} onChange={handleChangeEditStatus}>
              <option value={0}>Đang cập nhật</option>
              <option value={1}>Đã hoàn thành</option>
            </select>
            <IconButton onClick={submitEditedStatus}>
              <Check sx={iconStyle} />
            </IconButton>
          </div>
          :
          item.status === 0 ? <p className="manga-admin-show-unfinish-status">Đang cập nhật</p> : <p className="manga-admin-show-finish-status">Đã hoàn thành</p>}
      </div>
      <div>
        <h1>UpdateTime</h1>
        <p>{item.updateTime}</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>IsRecommeded</h1>
          <IconButton onClick={procEditRecommend}>
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        {isEditRecommended ?
          <div className='flex-edit-admin-textfield'>
            <select id="isRecommended" defaultValue={item.isRecommended ? '1' : '0'} onChange={handleChangeEditRecommend}>
              <option value={0}>False</option>
              <option value={1}>True</option>
            </select>
            <IconButton onClick={submitEditedRecommend}>
              <Check sx={iconStyle} />
            </IconButton>
          </div>
          :
          item.isRecommended ? <CircleOutlined /> : <Clear />}
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Tags</h1>
          <IconButton onClick={procEditTags}>
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        {
          isEditTags ?
            <div
              style={{
                'display': 'flex',
                'flexDirection': 'column',
                'gap': '30px',
                'maxWidth': '200px'
              }}>
              {
                editedTagsValue.map((editedTag, index) => (
                  <div className="manga-admin-show-editable-wrapper">
                    <select value={editedTag} onChange={(e) => handleChangeEditTag(e.target.value, index)}>
                      {CONFIG.TAG_LIST.map((tag) => (
                        <option value={tag} hidden={editedTagsValue.includes(tag)}>{tag}</option>
                      ))}
                    </select>
                    <IconButton onClick={(e) => removeEditedTag(index)}>
                      <Clear sx={iconStyle} />
                    </IconButton>
                  </div>
                ))
              }
              <IconButton onClick={addEditedTag}>
                <Add sx={iconStyle} />
              </IconButton>
              <IconButton onClick={submitEditedTags}>
                <Check sx={iconStyle} />
              </IconButton>
            </div>
            :
            <div className="tag-list-wrapper">
              {item.tags && item.tags.map(tag => (
                <div className="tag-wrapper">{tag}</div>
              ))}
            </div>
        }
      </div>
      <div>
        <h1>FollowedUsers</h1>
        <div className="admin-card-list-wrapper">
          {
            followedUsers && followedUsers.map(user => (
              <FollowUserCard
                avatar={user.avatar}
                displayname={user.displayname}
              />
            ))
          }
        </div>
        <div className='admin-show-expand-wrapper'>
          <a href={"/admin/user?searchfield=followMangas&searchvalue=" + item.id}>{'Mở rộng >'}</a>
        </div>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Chapters</h1>
          <IconButton >
            <Add sx={iconStyle} onClick={(e) => window.location.href='/admin/chapter/create?manga='+item.id}/>
          </IconButton>
        </div>
        <div className="admin-card-list-wrapper">
          {
            chapters && chapters.map(chapter => (
              <MangaChapterCard
                cover={chapter.cover}
                content={chapter.title}
              />
            ))
          }
        </div>
        <div className='admin-show-expand-wrapper'>
          <a href={"/admin/chapter?searchfield=manga&searchvalue=" + item.id}>{'Mở rộng >'}</a>
        </div>
      </div>
      <div>
        <h1>Comments</h1>
        <div className="admin-card-list-wrapper">
          {
            comments && comments.map(comment => (
              <MangaCommentCard
                useravatar={comment.user.avatar}
                userdisplayname={comment.user.displayname}
                content={comment.content}
                updateTime={comment.updateTime}
              />
            ))
          }
        </div>
        <div className='admin-show-expand-wrapper'>
          <a href={"/admin/comment?searchfield=manga&searchvalue=" + item.id}>{'Mở rộng >'}</a>
        </div>
      </div>
    </ShowAdminWrapper >
  );
}

export default MangaAdminShow;
