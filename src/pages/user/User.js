import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Info from './info/Info';
import './User.css'
import Favorite from './favorite/Favorite';
import Owned from './owned/Owned';
import Report from './report/Report';
import { setUserAvatar, setUsername } from './UserSlice';

function User(props) {
  const dispatch = useDispatch()
  const username = useSelector((state) => state.user.username)
  const userAvatar = useSelector((state) => state.user.avatar)
  const appUsername = useSelector((state) => state.app.username)
  const appUserAvatar = useSelector((state) => state.app.avatar)
  const [currentPage, setCurrentPage] = useState(props.page)

  const handlePageChange = (e) => {
    setCurrentPage(e.target.id)
  }

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

  useEffect(() => {
    dispatch(setUsername(appUsername))
    dispatch(setUserAvatar(appUserAvatar))
  }, [])

  return (
    <div className='outer'>
      <div className='inner'>
        <div className='header-wrapper'>
          <img className='user-avatar' src={userAvatar} alt='User avatar'/>
          <h1 className='username-header'>{username}</h1>
        </div>
        <div className='content-wrapper'>
          <Grid container justifyContent={'center'}>
            <Grid item xs={12} md={3}>
              <div className={currentPage==='info'?'first-selected-page-button-div':'first-page-button-div'} id='info' onClick={handlePageChange}>
                <h3 className='button-header' id='info'>Thông tin cá nhân</h3>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className={currentPage==='favorite'?'selected-page-button-div':'page-button-div'} id='favorite' onClick={handlePageChange}>
                <h3 className='button-header' id='favorite'>Truyện theo dõi</h3>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className={currentPage==='owned'?'selected-page-button-div':'page-button-div'} id='owned' onClick={handlePageChange}>
                <h3 className='button-header' id='owned'>Chương sở hữu</h3>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className={currentPage==='report'?'last-selected-button-div':'last-page-button-div'} id='report' onClick={handlePageChange}>
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
  