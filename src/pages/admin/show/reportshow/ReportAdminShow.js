import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ShowAdminWrapper from "../component/showadminwrapper/ShowAdminWrapper";
import './ReportAdminShow.css'
import { Add, CircleOutlined, Clear, Edit, } from "@mui/icons-material"
import { IconButton } from "@mui/material";

const iconStyle = {
  'color': '#0099FF',
}

function ReportAdminShow() {
  const params = useParams()

  const [reportId] = useState(params.id)

  return (
    <ShowAdminWrapper>
      <div>
        <h1>Id</h1>
        <p>{reportId}</p>
      </div>
      <div>
        <h1>Chapter</h1>
        <div className='admin-report-chapter-card-wrapper'>
            <div className='admin-report-chapter-card-cover-wrapper'>
                <img className='admin-report-chapter-card-cover' src='/chaptericon.jpg' alt='card-cover' />
            </div>
            <div className='admin-report-chapter-card-title-wrapper'>
                <p className='admin-report-chapter-title'>chapter</p>
            </div>
        </div>
      </div>
      <div>
        <h1>User</h1>
        <div className='report-admin-user-wrapper'>
          <img className='report-admin-user-avatar' src='/defaultavatar.jpg' alt='user-avatar' />
          <p className='report-user-displayname'>Tên hiển thị</p>
        </div>
      </div>
      <div>
        <h1>Content</h1>
        <p>Ảnh chương truyện bị lỗi</p>
      </div>
      <div>
        <h1>TimeCreated</h1>
        <p>16:57 1/02/2023</p>
      </div>
      <div>
        <h1>Status</h1>
        <p className="report-admin-show-unfinished-status">Chưa phản hồi</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Response</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
      </div>
    </ShowAdminWrapper>
  );
}

export default ReportAdminShow;
