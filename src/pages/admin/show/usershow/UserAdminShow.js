import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ShowAdminWrapper from "../component/showadminwrapper/ShowAdminWrapper";
import './UserAdminShow.css'
import { Add, CircleOutlined, Clear, Edit, } from "@mui/icons-material"
import { IconButton } from "@mui/material";
import OwnedUserCard from "./ownedusercard/OwnedUserCard";
import ChapterReportCard from "./chapterreportcard/ChapterReportCard";

const iconStyle = {
  'color': '#0099FF',
}

function UserAdminShow() {
  const params = useParams()

  const [userId] = useState(params.id)

  return (
    <ShowAdminWrapper>
      <div>
        <h1>Id</h1>
        <p>{userId}</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Email</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>email@email.com</p>
      </div>
      <div>
        <h1>Password</h1>
        <p>$2a$14$TS7aakGm9DIBS2iUvWHNSe4xzh57oJfy34Y/nVnrTtF923bpcw09C</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Role</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>Người dùng</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>DisplayName</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>Tên hiển thị</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Avatar</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <img src='/defaultavatar.jpg' alt='user-avatar' />
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>FirstName</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>Tên</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>LastName</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>Họ</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Gender</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>Nam</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>FollowMangas</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>OwnedChapters</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>Họ</p>
      </div>
      <div>
        <h1>Comments</h1>
        <p>Họ</p>
      </div>
      <div>
        <h1>Reports</h1>
        <p>Họ</p>
      </div>
    </ShowAdminWrapper >
  );
}

export default UserAdminShow;
