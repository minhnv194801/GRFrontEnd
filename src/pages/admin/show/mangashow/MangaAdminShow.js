import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ShowAdminWrapper from "../component/showadminwrapper/ShowAdminWrapper";
import './MangaAdminShow.css'
import { Add, Check, CircleOutlined, Clear, Edit, } from "@mui/icons-material";
import FollowUserCard from "./followusercard/FollowUserCard";
import MangaChapterCard from "./mangachaptercard/MangaChapterCard";
import MangaCommentCard from "./mangacommentcard/MangaCommentCard";
import { IconButton, TextField } from "@mui/material";
import CONFIG from "../../../../common/Config"

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
  const params = useParams()

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
    let fetchItem = {
      'id': mangaId,
      'name': 'Tên truyện',
      'alternateNames': ['Tên truyện 1', 'Tên truyện 2'],
      'author': 'Tác giả',
      'cover': '/mangaicon.jpg',
      'description': 'Mô tả truyện',
      'status': 0,
      'updateTime': '16:57 1/02/2023',
      'isRecommended': false,
      'tags': ['Action', 'Adventure'],
      'followedUsers': ['1'],
      'chapters': ['1'],
      'comments': ['1']
    }

    setItem(fetchItem)
    setFollowedUserIds(fetchItem.followedUsers)
    setChapterIds(fetchItem.chapters)
    setCommentIds(fetchItem.comments)
  }, [])

  useEffect(() => {
    if (followedUserIds !== null) {
      let fetchedFollowedUsers = [
        {
          'avatar': '/defaultavatar.jpg',
          'displayname': 'Tên hiển thị',
        },
      ]

      setFollowedUsers(fetchedFollowedUsers)
    }
  }, [followedUserIds])

  useEffect(() => {
    if (chapterIds !== null) {
      let fetchedChapters = [
        {
          'cover': '/chaptericon.jpg',
          'title': 'Chapter'
        }
      ]
      setChapters(fetchedChapters)
    }
  }, [chapterIds])

  useEffect(() => {
    if (commentIds !== null) {
      let fetchedComments = [
        {
          'user': {
            'avatar': '/defaultavatar.jpg',
            'displayname': 'Tên hiển thị',
          },
          'content': 'Truyện hay!',
          'updateTime': '16:57 1/02/2023'
        },
      ]

      setComments(fetchedComments)
    }
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
    //POST to backend
    let newItem = {
      ...item,
      'name': editedNameValue,
    }
    console.log(newItem)
    setItem(newItem)
    procEditName()
  }

  const submitEditedAuthor = (e) => {
    //POST to backend
    let newItem = {
      ...item,
      'author': editedAuthorValue,
    }
    console.log(newItem)
    setItem(newItem)
    procEditAuthor()
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

  const cancelEditCover = (e) => {
    closeEditCover()
  }

  const submitEditedDescription = (e) => {
    //POST to backend
    let newItem = {
      ...item,
      'description': editedDescriptionValue,
    }
    console.log(newItem)
    setItem(newItem)
    procEditDescription()
  }

  const submitEditedStatus = (e) => {
    //POST to backend
    let newItem = {
      ...item,
      'status': editedStatusValue,
    }
    console.log(newItem)
    setItem(newItem)
    procEditStatus()
  }

  const submitEditedRecommend = (e) => {
    //POST to backend
    let newItem = {
      ...item,
      'isRecommended': editedRecommendedValue,
    }
    console.log(newItem)
    setItem(newItem)
    procEditRecommend()
  }

  const submitEditedTags = (e) => {
    //POST to backend
    let newItem = {
      ...item,
      'tags': editedTagsValue.sort(),
    }
    console.log(newItem)
    setItem(newItem)
    procEditTags()
  }

  const submitEditedAltNames = (e) => {
    //POST to backend
    let newItem = {
      ...item,
      'alternateNames': editedAlternateNamesValue.filter(item => item.trim() !== ''),
    }
    console.log(newItem)
    setItem(newItem)
    procEditAlternateNames()
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
            <select id="status" defaultValue={item.isRecommended ? '1' : '0'} onChange={handleChangeEditRecommend}>
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
          <a href={"/admin/user?searchfield=followMangas&searchvalue="+item.id}>{'Mở rộng >'}</a>
        </div>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Chapters</h1>
          <IconButton >
            <Add sx={iconStyle} />
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
          <a href={"/admin/chapter?searchfield=manga&searchvalue="+item.id}>{'Mở rộng >'}</a>
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
          <a href={"/admin/comment?searchfield=manga&searchvalue="+item.id}>{'Mở rộng >'}</a>
        </div>
      </div>
    </ShowAdminWrapper >
  );
}

export default MangaAdminShow;
