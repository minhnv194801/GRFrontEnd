import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ShowAdminWrapper from "../component/showadminwrapper/ShowAdminWrapper";
import './MangaAdminShow.css'
import { Add, Check, CircleOutlined, Clear, Edit, } from "@mui/icons-material";
import FollowUserCard from "./followusercard/FollowUserCard";
import MangaChapterCard from "./mangachaptercard/MangaChapterCard";
import MangaCommentCard from "./mangacommentcard/MangaCommentCard";
import { IconButton, TextField } from "@mui/material";

const iconStyle = {
  'color': '#0099FF',
}

function MangaAdminShow() {
  const params = useParams()

  const [mangaId] = useState(params.id)
  const [item, setItem] = useState({})
  const [followedUser, setFollowedUser] = useState(null)
  const [chapters, setChapters] = useState(null)
  const [comments, setComments] = useState(null)

  const [isEditName, setIsEditName] = useState(false)
  const [isEditAlternateNames, setIsEditAlternateNames] = useState(false)
  const [isEditAuthor, setIsEditAuthor] = useState(false)
  const [isEditCover, setIsEditCover] = useState(false)
  const [isEditDescription, setIsEditDescription] = useState(false)
  const [isEditRecommended, setIsEditRecommended] = useState(false)
  const [isEditTags, setIsEditTags] = useState(false)

  const [editedNameValue, setEditedNameValue] = useState("")
  const [editedAlternateNamesValue, setEditedAlternateNamesValue] = useState([])
  const [editedAuthorValue, setEditedAuthorValue] = useState("")
  const [editedCoverValue, setEditedCoverValue] = useState("")
  const [editedDescriptionValue, setEditedDescriptionValue] = useState("")
  const [editedRecommendedValue, setEditedRecommendedValue] = useState(false)
  const [editedTagsValue, setEditedTagsValue] = useState("")

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
      'tags': ['Tag 1', 'Tag 2', 'Tag 3'],
    }
    
    setItem(fetchItem)
    setFollowedUser(['1'])
  }, [item])

  useEffect(() => {
    if (followedUser !== null) {
      let newItem = {
        ...item,
        'followusers': [
          {
            'avatar': '/defaultavatar.jpg',
            'displayname': 'Tên hiển thị',
          },
        ]
      }
      setItem(newItem)
      setChapters([])
    }
  }, [followedUser])

  useEffect(() => {
    if (chapters !== null) {
      let newItem = {
        ...item,
        'chapters': [
          {
            'cover': '/chaptericon.jpg',
            'title': 'Chapter'
          }
        ]
      }
      setItem(newItem)
      setComments(['1'])
    }
  }, [chapters])

  useEffect(() => {
    if (comments !== null) {
      let newItem = {
        ...item,
        'comments': [
          {
            'user': {
              'avatar': '/defaultavatar.jpg',
              'displayname': 'Tên hiển thị',
            },
            'content': 'Truyện hay!',
            'updateTime': '16:57 1/02/2023'
          },
        ]
      }
      setItem(newItem)
    }
  }, [comments])

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

  const procEditCoverValue = (e) => {
    setIsEditCover(!isEditCover)
    setEditedCoverValue(item.cover)
  }

  const procEditDescription = (e) => {
    setIsEditDescription(!isEditDescription)
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
        {isEditName?
          <div className='flex-edit-admin-textfield'>
            <TextField defaultValue={editedNameValue} onChange={handleChangeEditName}/>
            <IconButton onClick={submitEditedName}>
              <Check sx={iconStyle}/>
            </IconButton>
          </div>
        :
          <p>{item.name}</p>}
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>AlternateNames</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        {item.alternateNames&&item.alternateNames.map((alternateName) => (
          <p>{alternateName}</p>
        ))}
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Author</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>{item.author}</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Cover</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <img src={item.cover} alt='manga-cover' />
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Description</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>{item.description}</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Status</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        {item.status===0?<p className="manga-admin-show-unfinish-status">Đang cập nhật</p>:<p className="manga-admin-show-finish-status">Đã hoàn thành</p>}
      </div>
      <div>
        <h1>UpdateTime</h1>
        <p>{item.updateTime}</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>IsRecommeded</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        {item.isRecommended?<CircleOutlined />:<Clear />}
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Tags</h1>
          <IconButton>
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <div className="tag-list-wrapper">
          {item.tags&&item.tags.map(tag => (
            <div className="tag-wrapper">{tag}</div>
          ))}
        </div>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>FollowedUsers</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <div className="admin-card-list-wrapper">
          {
            item.followusers&&item.followusers.map(user => (
              <FollowUserCard 
                avatar={user.avatar}
                displayname={user.displayname}
              />
            ))
          }
        </div>
        <div className='admin-show-expand-wrapper'>
          {/* TODO: list user query */}
          <a href="/admin/user">{'Mở rộng >'}</a>
        </div>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Chapters</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
          <IconButton >
            <Add sx={iconStyle} />
          </IconButton>
        </div>
        <div className="admin-card-list-wrapper">
          {
            item.chapters&&item.chapters.map(chapter => (
              <MangaChapterCard 
                cover={chapter.cover}
                content={chapter.title}
              />
            ))
          }
        </div>
        <div className='admin-show-expand-wrapper'>
          <a href="/admin/chapter">{'Mở rộng >'}</a>
        </div>
      </div>
      <div>
        <h1>Comments</h1>
        <div className="admin-card-list-wrapper">
          {
            item.comments&&item.comments.map(comment => (
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
          <a href="/admin/comment">{'Mở rộng >'}</a>
        </div>
      </div>
    </ShowAdminWrapper>
  );
}

export default MangaAdminShow;
