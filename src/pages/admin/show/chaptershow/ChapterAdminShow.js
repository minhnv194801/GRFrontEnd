import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ShowAdminWrapper from "../component/showadminwrapper/ShowAdminWrapper";
import './ChapterAdminShow.css'
import { Add, CircleOutlined, Clear, Edit, } from "@mui/icons-material"
import { IconButton } from "@mui/material";
import OwnedUserCard from "./ownedusercard/OwnedUserCard";
import ChapterReportCard from "./chapterreportcard/ChapterReportCard";

const iconStyle = {
  'color': '#0099FF',
}

function ChapterAdminShow() {
  const params = useParams()

  const [chapterId] = useState(params.id)

  return (
    <ShowAdminWrapper>
      <div>
        <h1>Id</h1>
        <p>{chapterId}</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Manga</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <div className='admin-chapter-manga-card-wrapper'>
          <div className='admin-chapter-manga-card-cover-wrapper'>
            <img className='admin-chapter-manga-card-cover' src='/mangaicon.jpg' alt='card-cover' />
          </div>
          <div className='admin-chapter-manga-card-title-wrapper'>
            <p className='admin-chapter-manga-title'>manga</p>
          </div>
        </div>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Title</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>Tên chương truyện</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Cover</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <img src='/chaptericon.jpg' alt='chapter-cover' />
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Price</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>5000 VND</p>
      </div>
      <div>
        <h1>UpdateTime</h1>
        <p>16:57 1/02/2023</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Images</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <div className='chapter-admin-pages-wrapper'>
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
          <img className='chapter-admin-pages' src='/chaptericon.jpg' alt='chapter-page' />
        </div>
        <div>
          <h1>OwnedUsers</h1>
          <div className='admin-card-list-wrapper'>
            <OwnedUserCard />
            <OwnedUserCard />
            <OwnedUserCard />
          </div>
          <div className='admin-show-expand-wrapper'>
            <a href="/admin/user">{'Mở rộng >'}</a>
          </div>
        </div>
        <div>
          <h1>Reports</h1>
          <div className='admin-card-list-wrapper'>
            <ChapterReportCard status={0} />
            <ChapterReportCard status={1} />
            <ChapterReportCard status={1} />
            <ChapterReportCard status={1} />
          </div>
          <div className='admin-show-expand-wrapper'>
            <a href="/admin/report">{'Mở rộng >'}</a>
          </div>
        </div>
      </div>
    </ShowAdminWrapper >
  );
}

export default ChapterAdminShow;
