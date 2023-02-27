import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Favorite.css'
import refreshTokenIfNeeded from '../../../common/JWT';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../../AppSlice';
import { displayFailure } from '../../../components/topalert/TopAlertSlice';
import { useNavigate } from 'react-router-dom';
import { timeDifference } from '../../../common/Date';

function Favorite() {
    const [favoriteMangaList, setFavoriteMangaList] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sessionkey = useSelector((state) => state.app.sessionkey)
    const refreshkey = useSelector((state) => state.app.refreshkey)

    const refresh = async() => {
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

    useEffect(() => {
        const fetchData = async () => {
            try {
              let newSessionkey = await refresh()
              const response = await fetch('http://localhost:8080/api/v1/user/favorite', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                  'Authorization': newSessionkey?newSessionkey:sessionkey, 
                  'Content-Type': 'application/json'
                }
              })
              if (response.ok) {
                // convert data to json
                const json = await response.json();
                console.log(json)

                if (json === null || json.length === 0) {
                    setFavoriteMangaList([])
                } else {
                    json.forEach((respond) => {
                        var currentTime = Date.now()
                        respond.chapters.forEach((chapter) => {
                          chapter.updateTime = timeDifference(currentTime/1000, chapter.updateTime)
                        })
                    })
                    setFavoriteMangaList(json)
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
                        "content": "Gặp lỗi hệ thống khi tải danh sách bộ truyện theo dõi, xin vui lòng thử tải lại trang",
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
    }, [])

    return (
        <InfiniteScroll
            dataLength={favoriteMangaList.length}
            height={660}
        >
            {favoriteMangaList.length !== 0?
                favoriteMangaList.map((favoriteManga) => 
                    <div className='favorite-wrapper'>
                        <Grid container sx={{marginTop:'30px'}}>
                            <Grid item xs={12} md={4} sx={{textAlign:'center'}}>
                                <a href={'/manga/'+favoriteManga.id}>
                                    <img className='favorite-manga-cover' src={favoriteManga.cover} alt='manga-cover'/>
                                </a>
                            </Grid>
                            <Grid item xs={12} md={8} columnSpacing={3}>
                                <div className='favorite-title-wrapper'>    
                                    <a className='favorite-title-href' href={'/manga/'+favoriteManga.id}>
                                        <h3 className='favorite-title'>{favoriteManga.title}</h3>
                                    </a>
                                </div>
                                {favoriteManga.chapters.map((chapter) =>
                                    <div className='favorite-chapter'>
                                        <a className='favorite-chapter-href' href={'/read/'+chapter.id}>
                                            <h4>{chapter.title}</h4>
                                        </a>
                                        <h6 className='favorite-chapter-updatetime'>{'(Cập nhật: '+chapter.updateTime+')'}</h6>
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                    </div>
                )
                :
                <div><h3 className='emptyHeader'>Hiện bạn chưa theo dõi bộ truyện nào</h3></div>
            }
        </InfiniteScroll>
    )
}

export default Favorite