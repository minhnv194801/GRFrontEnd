import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setUsername, setUserAvatar } from './UserSlice'
import Info from './info/Info';
import './User.css'
import Favorite from './favorite/Favorite';
import Owned from './owned/Owned';
import Report from './report/Report';

function User() {
  const dispatch = useDispatch()
  const username = useSelector((state) => state.user.username)
  const userAvatar = useSelector((state) => state.user.avatar)
  const [currentPage, setCurrentPage] = useState("info")

  const handlePageChange = (e) => {
    setCurrentPage(e.target.id)
  }

  useEffect(() => {
    //TODO: fetch user basic info (username, avatar) from server
    let fetchedUserInfo = {
      "username": "User",
      "avatar": "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg",
    }

    dispatch(setUsername(fetchedUserInfo.username))
    dispatch(setUserAvatar(fetchedUserInfo.avatar))
  }, [])

  const userPage = () => {
    switch (currentPage) {
      case 'info':
        return (<Info />)
      case 'favorite':
        return (<Favorite />)
      case 'owned':
        return (<Owned />)
      case 'report':
        return (<Report />)
      default:
        return null
    }
  }

  return (
    <div className='outer'>
      <div className='inner'>
        <div className='header-wrapper'>
          <img className='user-avatar' src={userAvatar} alt='User avatar'/>
          <h1 className='username-header'>{username}</h1>
        </div>
        <div className='content-wrapper'>
          <Grid container>
            <Grid item xs="3">
              <div className={currentPage==='info'?'selected-page-button-div':'page-button-div'} id='info' onClick={handlePageChange}>
                <h3 className='button-header' id='info'>Thông tin cá nhân</h3>
              </div>
            </Grid>
            <Grid item xs="3">
              <div className={currentPage==='favorite'?'selected-page-button-div':'page-button-div'} id='favorite' onClick={handlePageChange}>
                <h3 className='button-header' id='favorite'>Truyện theo dõi</h3>
              </div>
            </Grid>
            <Grid item xs="3">
              <div className={currentPage==='owned'?'selected-page-button-div':'page-button-div'} id='owned' onClick={handlePageChange}>
                <h3 className='button-header' id='owned'>Chương sở hữu</h3>
              </div>
            </Grid>
            <Grid item xs="3">
              <div className={currentPage==='report'?'selected-button-div':'button-div'} id='report' onClick={handlePageChange}>
                <h3 className='button-header' id='report'>Thông tin báo lỗi</h3>
              </div>
            </Grid>
          </Grid>
          {userPage()}
        </div>
      </div>
    </div>
  );
}
  
export default User;
  