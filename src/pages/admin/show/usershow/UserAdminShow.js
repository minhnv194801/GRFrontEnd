import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ShowAdminWrapper from "../component/showadminwrapper/ShowAdminWrapper";
import './UserAdminShow.css'
import { Add, CircleOutlined, Clear, Edit, } from "@mui/icons-material"
import { IconButton } from "@mui/material";
import UserCommentCard from "./usercommentcard/UserCommentCard";
import OwnedChapterCard from "./ownedchaptercard/OwnedChapterCard";
import FollowMangaCard from "./followmangacard/FollowMangaCard";
import UserReportCard from "./userreportcard/UserReportCard";

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
        <div className="admin-card-list-wrapper">
          <FollowMangaCard 
            cover='/mangaicon.jpg'
            content='Manga'
          />
          <FollowMangaCard 
            cover='/mangaicon.jpg'
            content='Manga'
          />
          <FollowMangaCard 
            cover='/mangaicon.jpg'
            content='Manga'
          />
          <FollowMangaCard 
            cover='/mangaicon.jpg'
            content='Manga'
          />
          <FollowMangaCard 
            cover='/mangaicon.jpg'
            content='Manga'
          />
          <FollowMangaCard 
            cover='/mangaicon.jpg'
            content='Manga'
          />
          <FollowMangaCard 
            cover='/mangaicon.jpg'
            content='Manga'
          />
          <FollowMangaCard 
            cover='/mangaicon.jpg'
            content='Manga'
          />
          <FollowMangaCard 
            cover='/mangaicon.jpg'
            content='Manga'
          />
          <FollowMangaCard 
            cover='/mangaicon.jpg'
            content='Manga'
          />
          <FollowMangaCard 
            cover='/mangaicon.jpg'
            content='Manga'
          />
          <FollowMangaCard 
            cover='/mangaicon.jpg'
            content='Manga'
          />
        </div>
        <div className='admin-show-expand-wrapper'>
          <a href="/admin/manga">{'Mở rộng >'}</a>
        </div>
      </div>
      <div>
        <div className='manga-admin-show-editable-wrapper'>
          <h1>OwnedChapters</h1>
          <IconButton >
            <Edit sx={iconStyle} />
          </IconButton>
        </div>
        <div className="admin-card-list-wrapper">
          <OwnedChapterCard 
            cover='/chaptericon.jpg'
            content='Chapter'
          />
          <OwnedChapterCard 
            cover='/chaptericon.jpg'
            content='Chapter'
          />
          <OwnedChapterCard 
            cover='/chaptericon.jpg'
            content='Chapter'
          />
          <OwnedChapterCard 
            cover='/chaptericon.jpg'
            content='Chapter'
          />
          <OwnedChapterCard 
            cover='/chaptericon.jpg'
            content='Chapter'
          />
          <OwnedChapterCard 
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
        <div className="admin-card-list-wrapper">
          <UserCommentCard 
            mangaCover='/mangaicon.jpg'
            mangaTitle='Manga'
            content='Truyện hay!'
            updateTime='16:57 1/02/2023'
          />
          <UserCommentCard 
            mangaCover='/mangaicon.jpg'
            mangaTitle='Manga'
            content='Truyện hay!'
            updateTime='16:57 1/02/2023'
          />
          <UserCommentCard 
            mangaCover='/mangaicon.jpg'
            mangaTitle='Manga'
            content='Truyện hay!'
            updateTime='16:57 1/02/2023'
          />
          <UserCommentCard 
            mangaCover='/mangaicon.jpg'
            mangaTitle='Manga'
            content='Truyện hay!'
            updateTime='16:57 1/02/2023'
          />
          <UserCommentCard 
            mangaCover='/mangaicon.jpg'
            mangaTitle='Manga'
            content='Truyện hay!'
            updateTime='16:57 1/02/2023'
          />
          <UserCommentCard 
            mangaCover='/mangaicon.jpg'
            mangaTitle='Manga'
            content='Truyện hay!'
            updateTime='16:57 1/02/2023'
          />
          <UserCommentCard 
            mangaCover='/mangaicon.jpg'
            mangaTitle='Manga'
            content='Truyện hay!'
            updateTime='16:57 1/02/2023'
          />
        </div>
        <div className='admin-show-expand-wrapper'>
          <a href="/admin/comment">{'Mở rộng >'}</a>
        </div>
      </div>
      <div>
        <h1>Reports</h1>
        <div className="admin-card-list-wrapper">
          <UserReportCard 
            mangaCover='/mangaicon.jpg'
            mangaTitle='Manga'
            content='Ảnh truyện bị lổi rồi'
            updateTime='16:57 1/02/2023'
            status={0}
          />
          <UserReportCard 
            mangaCover='/mangaicon.jpg'
            mangaTitle='Manga'
            content='Ảnh truyện bị lổi rồi'
            updateTime='16:57 1/02/2023'
            status={0}
          />
          <UserReportCard 
            mangaCover='/mangaicon.jpg'
            mangaTitle='Manga'
            content='Ảnh truyện bị lổi rồi'
            updateTime='16:57 1/02/2023'
            status={1}
          />
          <UserReportCard 
            mangaCover='/mangaicon.jpg'
            mangaTitle='Manga'
            content='Ảnh truyện bị lổi rồi'
            updateTime='16:57 1/02/2023'
            status={1}
          />
          <UserReportCard 
            mangaCover='/mangaicon.jpg'
            mangaTitle='Manga'
            content='Ảnh truyện bị lổi rồi'
            updateTime='16:57 1/02/2023'
            status={1}
          />
          <UserReportCard 
            mangaCover='/mangaicon.jpg'
            mangaTitle='Manga'
            content='Ảnh truyện bị lổi rồi'
            updateTime='16:57 1/02/2023'
            status={1}
          />
          <UserReportCard 
            mangaCover='/mangaicon.jpg'
            mangaTitle='Manga'
            content='Ảnh truyện bị lổi rồi'
            updateTime='16:57 1/02/2023'
            status={1}
          />
          <UserReportCard 
            mangaCover='/mangaicon.jpg'
            mangaTitle='Manga'
            content='Ảnh truyện bị lổi rồi'
            updateTime='16:57 1/02/2023'
            status={1}
          />
        </div>
        <div className='admin-show-expand-wrapper'>
          <a href="/admin/report">{'Mở rộng >'}</a>
        </div>
      </div>
    </ShowAdminWrapper >
  );
}

export default UserAdminShow;
