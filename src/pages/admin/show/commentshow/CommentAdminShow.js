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

  return (
    <ShowAdminWrapper>
      <div>
        <h1>Id</h1>
        <p>{commentId}</p>
      </div>
      <div>
        <h1>Manga</h1>
        <div className='admin-comment-manga-card-wrapper'>
            <div className='admin-comment-manga-card-cover-wrapper'>
                <img className='admin-comment-manga-card-cover' src='/mangaicon.jpg' alt='card-cover' />
            </div>
            <div className='admin-comment-manga-card-title-wrapper'>
                <p className='admin-comment-manga-title'>manga</p>
            </div>
        </div>
      </div>
      <div>
        <h1>User</h1>
        <div className='comment-admin-user-wrapper'>
          <img className='comment-admin-user-avatar' src='/defaultavatar.jpg' alt='user-avatar' />
          <p className='comment-user-displayname'>Tên hiển thị</p>
        </div>
      </div>
      <div>
        <h1>Content</h1>
        <p>Truyện hay!</p>
      </div>
      <div>
        <h1>TimeCreated</h1>
        <p>16:57 1/02/2023</p>
      </div>
    </ShowAdminWrapper>
  );
}

export default CommentAdminShow;
