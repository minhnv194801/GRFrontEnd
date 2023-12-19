import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Report.css'
import refreshTokenIfNeeded from '../../../common/JWT';
import { login, logout } from '../../../AppSlice';
import { displayFailure } from '../../../components/topalert/TopAlertSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { timeConverter } from '../../../common/Date';

function Report() {
  const [reportList, setReportList] = useState([{}])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sessionkey = useSelector((state) => state.app.sessionkey)
  const refreshkey = useSelector((state) => state.app.refreshkey)

  const refresh = async () => {
    var res = await refreshTokenIfNeeded(sessionkey, refreshkey)
    if (res.isRefresh) {
      if (res.sessionkey) {
        dispatch(login(res))
      } else {
        dispatch(logout())
        navigate('/')
        dispatch(displayFailure({
          "title": "Đăng xuất",
          "content": "Phiên đăng nhập của bạn đã hết hạn. Xin hãy đăng nhập lại",
        }))
      }
    }
    return res.sessionkey
  }

  const getReportStatusHTML = (status) => {
    if (status === 0) {
      return (<h5 className='report-status'>Trạng thái:<div className='unfinished-report'> Chưa xử lý</div></h5>)
    } else if (status === 1) {
      return (<h5 className='report-status'>Trạng thái:<div className='finished-report'> Đã xử lý</div></h5>)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      let newSessionkey = await refresh()
      try {
        const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/user/report', {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Authorization': newSessionkey ? newSessionkey : sessionkey,
            'Content-Type': 'application/json'
          }
        })
        if (response.ok) {
          // convert data to json
          const json = await response.json();
          // console.log('json')
          if (json === null || json.length === 0) {
            setReportList([])
          } else {
            json.forEach(respond => {
              respond.timeCreated = timeConverter(respond.timeCreated)
            });
            setReportList(json)
          }
        } else {
          if (response.status === 401) {
            navigate("/")
            dispatch(displayFailure({
              "title": "Unauthorized",
              "content": "Vui lòng đăng nhập lại",
            }))
          } else {
            dispatch(displayFailure({
              "title": "Lỗi hệ thống",
              "content": "Gặp lỗi hệ thống khi tải danh sách báo lỗi, xin vui lòng thử tải lại trang",
            }))
          }
        }
      } catch (error) {
        dispatch(displayFailure({
          "title": "Lỗi kết nối",
          "content": "Kết nối với server thất bại",
        }))
      }
    }

    fetchData()
    // eslint-disable-next-line
  }, [])

  return (
    <InfiniteScroll
      dataLength={reportList.length}
      height={660}
    >
      {reportList.length !== 0 ?
        reportList.map((report) =>
          <div className='report-list-wrapper'>
            <Grid container sx={{ marginTop: '30px' }}>
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <a href={'/read/' + report.chapterId}>
                  <img className='report-chapter-cover' src={report.chapterCover} alt='report-cover' />
                </a>
              </Grid>
              <Grid item xs={12} md={8}>
                <div className='report-chapter-title-wrapper'>
                  <a className='report-chapter-title-href' href={'/read/' + report.chapterId}>
                    <h3 className='report-chapter-title'>{report.chapterTitle}</h3>
                  </a>
                  <h6 className='report-timeCreated'>{'(' + report.timeCreated + ')'}</h6>
                </div>
                <h5 className='report-content'>{'Nội dung: ' + report.content}</h5>
                {getReportStatusHTML(report.status)}
                <h5 className='report-response'>{'Phản hồi: ' + report.response}</h5>
              </Grid>
            </Grid>
          </div>
        )
        :
        <div><h3 className='emptyHeader'>Hiện bạn chưa có báo lỗi nào</h3></div>
      }
    </InfiniteScroll>
  )
}

export default Report