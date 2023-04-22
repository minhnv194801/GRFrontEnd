import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux'
import { displayFailure, displaySuccess } from '../../components/topalert/TopAlertSlice'
import { timeDifference } from "../../common/Date";
import './Manga.css'
import refreshTokenIfNeeded from "../../common/JWT";
import { login, logout } from "../../AppSlice";
import { openLoginModal } from "../../components/loginmodal/LoginModalSlice";

function Manga() {
  const chaptersPerPage = 5
  const commentsPerPage = 6
  
  const params = useParams()
  const chapterListRef = useRef(null)
  const commentListRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // enlist-disable-next-line
  const [mangaId, setMangaId] = useState(params.id)
  const [manga, setManga] = useState({
    "title": "Loading...",
    "cover": "",
    "isFavorite": false,
    "author": "Loading...",
    "status": "Loading...",
    "tags": ["Loading..."],
    "userRating": "0",
    "avgRating": "0",
    "ratingCount": "0",
    "description": "Loading..."
  })
  const [numberOfChapterPages, setNumberOfChapterPages] = useState(1)
  const [chapterOffset, setChapterOffset] = useState(0)
  const [chapterList, setChapterList] = useState([{}])
  const [numberOfCommentPages, setNumberOfCommentPages] = useState(1)
  const [commentOffset, setCommentOffset] = useState(0)
  const [commentList, setCommentList] = useState([{}])
  const [currentComment, setCurrentComment] = useState("")
  const sessionkey = useSelector((state) => state.app.sessionkey)
  const refreshkey = useSelector((state) => state.app.refreshkey)
  const username = useSelector((state) => state.app.username)
  const avatar = useSelector((state) => state.app.avatar)
  const isLogin = useSelector((state) => state.app.isLogin)

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

  const handleChapterPageClick = (event) => {
    setChapterOffset(event.selected * chaptersPerPage);
    chapterListRef.current.scrollIntoView()
  }

  const handleCommentPageClick = (event) => {
    setCommentOffset(event.selected * commentsPerPage);
    commentListRef.current.scrollIntoView()
  }
  
  const handleFavorite = (e) => {
    // TODO: Send favorite/unfavorite to server
    const postFavorite = async() => {
      let newSessionkey = await refresh()
      try {
        const response = await fetch('http://localhost:8081/api/v1/favorite/' + mangaId, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': newSessionkey?newSessionkey:sessionkey,
          },
          body: JSON.stringify({})
        });
        
        if (response.ok) {
          setManga({
            ...manga,
            isFavorite: !manga.isFavorite
          });
        
          if (manga.isFavorite) {
            dispatch(displaySuccess({
              "title": "Thành công",
              "content": "Đã bỏ truyện khỏi danh sách theo dõi",
            }))
          } else {
            dispatch(displaySuccess({
              "title": "Thành công",
              "content": "Đã thêm truyện vào danh sách theo dõi",
            }))
          }
        } else {
            if (response.status === 401) {
                dispatch(displayFailure({
                    "title": "Đăng xuất",
                    "content": "Phiên đăng nhập của bạn đã hết hạn",
                }))    
            }
            var json = await response.json()
            dispatch(displayFailure({
                "title": "Thất bại",
                "content": json.message,
            }))
        }
      } catch (error) {
        dispatch(displayFailure({
          "title": "Lỗi kết nối",
          "content": "Kết nối với server thất bại",
        }))
      }
    }
    
    if (!isLogin) {
      dispatch(displayFailure({
        "title": "Thất bại",
        "content": "Hãy đăng nhập để bắt đầu theo dõi truyện nhé",
      }))
      dispatch(openLoginModal())
    } else {
      postFavorite()
    }    
  }

  const handleRating = (e) => {
    const postRating = async() => {
      let newSessionkey = await refresh()
      try {
        const response = await fetch('http://localhost:8081/api/v1/manga/' + mangaId + '/rate', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': newSessionkey?newSessionkey:sessionkey,
          },
          body: JSON.stringify({ 
            'rating': parseInt(e.target.value)
          })
        });

        if (response.ok) {
          setManga((prevManga) => {
            if (prevManga.userRating === 0) {
              return({
                ...prevManga,
                userRating: e.target.value,
                avgRating: ((prevManga.avgRating*prevManga.ratingCount)+e.target.value)/(prevManga.ratingCount+1),
                ratingCount: prevManga.ratingCount + 1,
              })
            }

            return({
              ...prevManga,
              avgRating: ((prevManga.avgRating*prevManga.ratingCount)-prevManga.userRating+e.target.value)/(prevManga.ratingCount),
              userRating: e.target.value,
            })
          })
          dispatch(displaySuccess({
            "title": "Thành công",
            "content": "Đánh giá đã được gửi thành công",
          }))   
        } else {
            if (response.status === 401) {
                dispatch(displayFailure({
                    "title": "Đăng xuất",
                    "content": "Phiên đăng nhập của bạn đã hết hạn",
                }))    
            }
            var json = await response.json()
            dispatch(displayFailure({
                "title": "Thất bại",
                "content": json.message,
            }))
        }
      } catch (error) {
        dispatch(displayFailure({
          "title": "Lỗi kết nối",
          "content": "Kết nối với server thất bại",
        }))
      }
    }

    if (!isLogin) {
      dispatch(displayFailure({
        "title": "Thất bại",
        "content": "Hãy đăng nhập để bắt đầu đánh giá truyện nhé",
      }))
      dispatch(openLoginModal())
    } else {
      postRating()
    }
  }

  const handleCommentBoxChange = (e) => {
    setCurrentComment(e.target.value)
  }

  const handleCommentSubmition = (e) => {
    const postComment = async() => {
      let newSessionkey = await refresh()
      try {
        const response = await fetch('http://localhost:8081/api/v1/comment/' + mangaId, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': newSessionkey?newSessionkey:sessionkey,
          },
          body: JSON.stringify({ 
            'content': currentComment
          })
        });

        if (response.ok) {
          setCommentList([
            {
              "username": username,
              "avatar": avatar,
              "content": currentComment,
              "updateTime": "vừa xong",
            },
            ...commentList
          ])
      
          dispatch(displaySuccess({
            "title": "Thành công",
            "content": "Bình luận đã được đăng thành công",
          }))
        } else {
            if (response.status === 401) {
                dispatch(displayFailure({
                    "title": "Đăng xuất",
                    "content": "Phiên đăng nhập của bạn đã hết hạn",
                }))    
            }
            var json = await response.json()
            dispatch(displayFailure({
                "title": "Thất bại",
                "content": json.message,
            }))
        }
      } catch (error) {
        dispatch(displayFailure({
          "title": "Lỗi kết nối",
          "content": "Kết nối với server thất bại",
        }))
      }
    }

    // TODO: Send comment to server
    if (!isLogin) {
      dispatch(displayFailure({
        "title": "Thất bại",
        "content": "Hãy đăng nhập để bắt đầu bình luận truyện nhé",
      }))
      dispatch(openLoginModal())
    } else {
      postComment()
    }
  }

  const handleReadChapter = (e) => {
    navigate('/read/' + e.target.value)
  }

  useEffect(() => {
    const fetchMangaInfo = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/v1/manga/' + mangaId, {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionkey,
          },
        });
        if (response.ok) {
          // convert data to json
          const json = await response.json();
          console.log(json)
          setManga(json)
          setNumberOfChapterPages(Math.ceil(json.chapterCount / chaptersPerPage))
        } else {
          dispatch(displayFailure({
            "title": "Lỗi hệ thống",
            "content": "Gặp sự cố hệ thống khi tải thông tin truyện, xin vui lòng thử tải lại trang",
          }))
        }
      } catch (error) {
        dispatch(displayFailure({
          "title": "Lỗi kết nối",
          "content": "Kết nối với server thất bại",
        }))
      }
    }

    fetchMangaInfo()
  }, [])

  useEffect(() => {
    const fetchChapterListInfo = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/v1/manga/' + mangaId + '/chapterlist', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            'count': chaptersPerPage,
            'position': chapterOffset,
          })
        });
        if (response.ok) {
          const json = await response.json();
  
          console.log(json)
          json.forEach((chapter) => {
            var currentTime = Date.now()
            chapter.updateTime = timeDifference(currentTime/1000, chapter.updateTime)
          })
          setChapterList(json)
        } else {
          dispatch(displayFailure({
            "title": "Lỗi hệ thống",
            "content": "Gặp sự cố hệ thống khi tải danh sách chương, xin vui lòng thử tải lại trang",
          }))
        }
      } catch (error) {
        dispatch(displayFailure({
          "title": "Lỗi kết nối",
          "content": "Kết nối với server thất bại",
        }))
      }
    }
    fetchChapterListInfo()
  }, [chapterOffset])

  useEffect(() => {
    const fetchCommentListData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/v1/manga/' + mangaId + '/commentlist', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            'count': commentsPerPage,
            'position': commentOffset,
          })
        });
        if (response.ok) {
          // convert data to json
          const json = await response.json();
          
          if (json.data === null || json.data?.length === 0) {
            console.log("Hello")
            setCommentList([])
          } else {
            json.data.forEach((chapter) => {
              var currentTime = Date.now()
              chapter.updateTime = timeDifference(currentTime/1000, chapter.updateTime)
            })
            setCommentList(json.data)
            setNumberOfCommentPages(Math.ceil(json.totalCount/commentsPerPage))
          }
        } else {
          setCommentList([])
          dispatch(displayFailure({
            "title": "Lỗi hệ thống",
            "content": "Gặp sự cố hệ thống khi tải thông tin bình luận, xin vui lòng thử tải lại trang",
          }))
        }
      } catch (error) {
        dispatch(displayFailure({
          "title": "Lỗi kết nối",
          "content": "Kết nối với server thất bại",
        }))
      }

    }

    fetchCommentListData()
  }, [commentOffset])

  return (
    <div className='outer'>
      <div className='inner'>
        <h1 className='manga-title-header'>{manga.title}</h1>
        <div className='cover-wrapper'>
          <img className="manga-cover" src={manga.cover} alt='bìa truyện' />
        </div>
        <div className='favorite-btn-wrapper'>
          <Button sx={{ borderRadius: '25px', backgroundColor: "#990000", "&:hover": { backgroundColor: "#C00000" } }} variant="contained" onClick={handleFavorite} startIcon={<FavoriteIcon />}>{manga.isFavorite ? "Bỏ theo dõi" : "Theo dõi"}</Button>
        </div>
        <div className="info-grid">
          <Grid container>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={4}>
              <b>
                Tác giả:
              </b>
            </Grid>
            <Grid item xs={4}>
              <p>
                {manga.author===""?"Đang cập nhật":manga.author}
              </p>
            </Grid>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={4}>
              <b>
                Tình trạng:
              </b>
            </Grid>
            <Grid item xs={4}>
              <p>
                {manga.status===0?"Đang tiến hành":"Đã hoàn thành"}
              </p>
            </Grid>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={4}>
              <b>
                Thể loại:
              </b>
            </Grid>
            <Grid item xs={4}>
              <p>
                {manga.tags.join(" - ")}
              </p>
            </Grid>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={4}>
              <b>
                Đánh giá:
              </b>
            </Grid>
            <Grid item xs={4}>
              <Rating
                onChange={handleRating}
                value={manga.userRating}
              />
            </Grid>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={6}>
            </Grid>
            <Grid item xs={6}>
              (Trung bình: {manga.avgRating}/5 - {manga.ratingCount} lượt đánh giá)
            </Grid>
          </Grid>
        </div>
        <div className='description-wrapper'>
          <h2 className='section-header'>Mô tả</h2>
          <p className='desc-paragraph'>
            {manga.description}
          </p>
        </div>
        <div className='chapter-list-wrapper'>
          <h2 className='section-header' ref={chapterListRef}>Chương truyện</h2>
          {chapterList.map((chapter) =>
            <div className='single-chapter-wrapper'>
              <Grid container>
                <Grid sx={{ textAlign: "center" }} item md={3}>
                  <img className='chapter-cover' src={chapter.cover} alt="Bìa chương truyện" />
                </Grid>
                <Grid item md={9}>
                  <div>
                    <h3 className='chapter-title'>
                      {chapter.title}
                    </h3>
                    <p className='chapter-updatetime'>
                      {"(Cập nhật: " + chapter.updateTime + ")"}
                    </p>
                    {
                      (!chapter.isOwned) ?
                        <div>
                          <h6>
                            {chapter.price + " VND"}
                          </h6>
                          <Button sx={{ borderRadius: '25px', backgroundColor: "#ed2939", "&:hover": { backgroundColor: "#cc0023" } }} variant="contained">Mua</Button>
                        </div>
                        :
                        <div>
                          <Button sx={{ borderRadius: '25px', backgroundColor: "#990000", "&:hover": { backgroundColor: "#C00000" } }} value={chapter.id} onClick={handleReadChapter} variant="contained">Đọc</Button>
                        </div>
                    }
                  </div>
                </Grid>
              </Grid>
            </div>
          )}
          <div className="page-paginate">
            <ReactPaginate
              nextLabel=">"
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              pageCount={numberOfChapterPages}
              onPageChange={handleChapterPageClick}
              previousLabel="<"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
        <div className='comment-wrapper'>
          <Box className='comment-box-wrapper' boxShadow={1}>
            <TextField
              sx={{
                background: "#ffff"
              }}
              onChange={handleCommentBoxChange}
              fullWidth
              hiddenLabel
              multiline
              rows={6}
              placeholder="Mời bạn tham gia bình luận tại đây"
              variant="standard"
            />
          </Box>
          <Button sx={{ borderRadius: '25px', backgroundColor: "#990000", "&:hover": { backgroundColor: "#C00000" }, marginLeft:"75%", marginTop:"10px", maxWidth:"20%"}} onClick={handleCommentSubmition} variant="contained">Bình luận</Button>
          <h2 className='section-header' ref={commentListRef}>Bình luận</h2>
          <div className="comment-list-wrapper">
            {
              commentList.length === 0?
              <div>Chưa có ai bình luận. Hay bạn là người đầu tiên nhé!</div>
              :
              <div>
                {commentList.map((comment) => 
                  <Grid container>
                  <Grid item xs={2} sx={{textAlign:"center"}}>
                    <img className="comment-avatar" src={comment.avatar} alt="user-avatar"/>
                  </Grid>
                  <Grid item xs={10}>
                    <div className="comment-content-wrapper">
                      <h3 className="comment-username">
                        {comment.username}
                      </h3>
                      <p className="comment-content">
                        {comment.content}
                      </p>
                      <p className="comment-updatetime">
                        {comment.updateTime}
                      </p>
                    </div>
                  </Grid>
                </Grid>)}
                <div className="page-paginate">
                  <ReactPaginate
                    nextLabel=">"
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    pageCount={numberOfCommentPages}
                    onPageChange={handleCommentPageClick}
                    previousLabel="<"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                  />
                </div>
              </div>  
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manga;
