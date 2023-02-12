import Grid from '@mui/material/Grid';
import { current } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import './User.css'

function User() {
  const [userInfo, setUserInfo] = useState({})
  const [currentPage, setCurrentPage] = useState("info")

  const handlePageChange = (e) => {
    setCurrentPage(e.target.id)
  }

  useEffect(() => {
    //TODO: fetch user basic info (username, avatar) from server
    setUserInfo({
      "username": "User",
      "avatar": "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg",
    })
  }, [])

  return (
    <div className='outer'>
      <div className='inner'>
        <div className='header-wrapper'>
          <img className='user-avatar' src={userInfo.avatar} alt='User avatar'/>
          <h1 className='username-header'>User</h1>
        </div>
        <div className='content-wrapper'>
          <Grid container>
            <Grid item md="3">
              <div className={currentPage==='info'?'selected-button-div':'button-div'} id='info' onClick={handlePageChange}>
                <h3 className='button-header' id='info'>Thông tin cá nhân</h3>
              </div>
            </Grid>
            <Grid item md="3">
              <div className={currentPage==='favorite'?'selected-button-div':'button-div'} id='favorite' onClick={handlePageChange}>
                <h3 className='button-header' id='favorite'>Truyện theo dõi</h3>
              </div>
            </Grid>
            <Grid item md="3">
              <div className={currentPage==='owned'?'selected-button-div':'button-div'} id='owned' onClick={handlePageChange}>
                <h3 className='button-header' id='owned'>Chương sở hữu</h3>
              </div>
            </Grid>
            <Grid item md="3">
              <div className={currentPage==='report'?'selected-button-div':'button-div'} id='report' onClick={handlePageChange}>
                <h3 className='button-header' id='report'>Thông tin báo lỗi</h3>
              </div>
            </Grid>
          </Grid>
          <h1>
            content
          </h1>
        </div>
      </div>
    </div>
  );
}
  
export default User;
  