import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ShowAdminWrapper from "../component/showadminwrapper/ShowAdminWrapper";
import './MangaAdminShow.css'
import { Add, CircleOutlined, Clear, Edit, } from "@mui/icons-material";
import FollowUserCard from "./followusercard/FollowUserCard";
import MangaChapterCard from "./mangachaptercard/MangaChapterCard";
import MangaCommentCard from "./mangacommentcard/MangaCommentCard";
import { IconButton } from "@mui/material";

const iconStyle = {
  'color': '#0099FF',
}

function MangaAdminShow() {
  const params = useParams()

  const [mangaId] = useState(params.id)

  return (
    <ShowAdminWrapper>
      <div>
        <h1>Id</h1>
        <p>{mangaId}</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Name</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>Tên truyện</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>AlternateNames</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>Tên truyện 1</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Author</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>Tác giả</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Cover</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <img src='/mangaicon.jpg' alt='manga-cover' />
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Description</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p>Mô tả truyện</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Status</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <p className="manga-admin-show-finish-status">Đã hoàn thành</p>
      </div>
      <div>
        <h1>UpdateTime</h1>
        <p>16:57 1/02/2023</p>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>IsRecommeded</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <CircleOutlined />
        <Clear />
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>Tags</h1>
          <IconButton>
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <div className="tag-list-wrapper">
          <div className="tag-wrapper">Tag 1</div>
          <div className="tag-wrapper">Tag 2</div>
          <div className="tag-wrapper">Tag 3</div>
        </div>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>FollowedUsers</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <div className="admin-manga-show-list-wrapper">
          <FollowUserCard />
          <FollowUserCard />
          <FollowUserCard />
          <FollowUserCard />
          <FollowUserCard />
          <FollowUserCard />
          <FollowUserCard />
          <FollowUserCard />
          <FollowUserCard />
          <FollowUserCard />
        </div>
        <div className='admin-show-expand-wrapper'>
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
        <div className="admin-manga-show-list-wrapper">
          <MangaChapterCard
            cover='/chaptericon.jpg'
            content='Chapter'
          />
          <MangaChapterCard
            cover='/chaptericon.jpg'
            content='Chapter'
          />
          <MangaChapterCard
            cover='/chaptericon.jpg'
            content='Chapter'
          />
          <MangaChapterCard
            cover='/chaptericon.jpg'
            content='Chapter'
          />
          <MangaChapterCard
            cover='/chaptericon.jpg'
            content='Chapter'
          />
          <MangaChapterCard
            cover='/chaptericon.jpg'
            content='Chapter'
          />
          <MangaChapterCard
            cover='/chaptericon.jpg'
            content='Chapter'
          />
        </div>
        <div className='admin-show-expand-wrapper'>
          <a href="/admin/chapter">{'Mở rộng >'}</a>
        </div>
      </div>
      <div>
        <h1>Comments</h1>
        <div className="admin-manga-show-list-wrapper">
          <MangaCommentCard />
          <MangaCommentCard />
          <MangaCommentCard />
          <MangaCommentCard />
          <MangaCommentCard />
          <MangaCommentCard />
          <MangaCommentCard />
          <MangaCommentCard />
        </div>
        <div className='admin-show-expand-wrapper'>
          <a href="/admin/comment">{'Mở rộng >'}</a>
        </div>
      </div>
    </ShowAdminWrapper>
  );
}

export default MangaAdminShow;
