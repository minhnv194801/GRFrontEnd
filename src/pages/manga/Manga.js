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
import refreshTokenIfNeeded from "../../common/JWT";
import { login, logout } from "../../AppSlice";
import MangaChapterList from "./mangachapterlist/MangaChapterList";
import { Circle } from "@mui/icons-material";
import './Manga.css'

function Manga() {
  const chaptersPerPage = 6
  const commentsPerPage = 6

  const params = useParams()
  const pageRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // enlist-disable-next-line
  const [mangaId] = useState(params.id)
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
  const [isDescExpand, setIsDescExpand] = useState(false)
  const [numberOfChapterPages, setNumberOfChapterPages] = useState(1)
  const [chapterOffset, setChapterOffset] = useState(0)
  const [chapterList, setChapterList] = useState([{}])
  const [numberOfCommentPages, setNumberOfCommentPages] = useState(1)
  const [commentOffset, setCommentOffset] = useState(0)
  const [commentList, setCommentList] = useState([{}])
  const [currentComment, setCurrentComment] = useState("")
  const [currentSection, setCurrentSection] = useState('chapterlist')
  const sessionkey = useSelector((state) => state.app.sessionkey)
  const refreshkey = useSelector((state) => state.app.refreshkey)
  const username = useSelector((state) => state.app.username)
  const avatar = useSelector((state) => state.app.avatar)
  const isLogin = useSelector((state) => state.app.isLogin)

  const handleSectionChange = (e) => {
    setCurrentSection(e.target.id)
  }

  const mangaSection = () => {
    switch (currentSection) {
      case 'chapterlist':
        return (
          <div className="chapter-list-wrapper">
            <MangaChapterList chapterList={chapterList} />
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
        )
      case 'commentlist':
        return (
          <div className='comment-wrapper'>
            <div className='comment-input-wrapper'>
              <Box className='comment-box-wrapper'>
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
              <Button sx={{ borderRadius: '25px', backgroundColor: "#ED2939", "&:hover": { backgroundColor: "#C00000" }, marginLeft: "0%", marginTop: "10px" }} onClick={handleCommentSubmition} variant="contained">Bình luận</Button>
            </div>
            <div className="comment-list-wrapper">
              {
                commentList.length === 0 ?
                  <div>Chưa có ai bình luận. Hay bạn là người đầu tiên nhé!</div>
                  :
                  <div>
                    {commentList.map((comment) =>
                      <Grid container>
                        <Grid item xs={3} md={2} sx={{ textAlign: "center" }}>
                          <img className="comment-avatar" src={comment.avatar} alt="user-avatar" />
                        </Grid>
                        <Grid item xs={9} md={10}>
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
        )
      default:
        setCurrentSection('chapterlist')
    }
  }

  const procDescParagraph = () => {
    setIsDescExpand(!isDescExpand)
  }

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

  const handleChapterPageClick = (event) => {
    setChapterOffset(event.selected * chaptersPerPage);
    pageRef.current.scrollIntoView()
  }

  const handleCommentPageClick = (event) => {
    setCommentOffset(event.selected * commentsPerPage);
    pageRef.current.scrollIntoView()
  }

  const handleFavorite = (e) => {
    // TODO: Send favorite/unfavorite to server
    const postFavorite = async () => {
      let newSessionkey = await refresh()
      try {
        const response = await fetch('http://localhost:8081/api/v1/favorite/' + mangaId, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': newSessionkey ? newSessionkey : sessionkey,
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
    } else {
      postFavorite()
    }
  }

  const handleRating = (e) => {
    const postRating = async () => {
      let newSessionkey = await refresh()
      try {
        const response = await fetch('http://localhost:8081/api/v1/manga/' + mangaId + '/rate', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': newSessionkey ? newSessionkey : sessionkey,
          },
          body: JSON.stringify({
            'rating': parseInt(e.target.value)
          })
        });

        if (response.ok) {
          setManga((prevManga) => {
            if (prevManga.userRating === 0) {
              return ({
                ...prevManga,
                userRating: e.target.value,
                avgRating: ((prevManga.avgRating * prevManga.ratingCount) + e.target.value) / (prevManga.ratingCount + 1),
                ratingCount: prevManga.ratingCount + 1,
              })
            }

            return ({
              ...prevManga,
              avgRating: ((prevManga.avgRating * prevManga.ratingCount) - prevManga.userRating + e.target.value) / (prevManga.ratingCount),
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
    } else {
      postRating()
    }
  }

  const handleCommentBoxChange = (e) => {
    setCurrentComment(e.target.value)
  }

  const handleCommentSubmition = (e) => {
    const postComment = async () => {
      let newSessionkey = await refresh()
      try {
        const response = await fetch('http://localhost:8081/api/v1/comment/' + mangaId, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': newSessionkey ? newSessionkey : sessionkey,
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
    } else {
      postComment()
    }
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
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const fetchChapterListInfo = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/v1/manga/' + mangaId + '/chapterlist/' + chapterOffset + '/' + chaptersPerPage + '/', {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const json = await response.json();

          console.log(json)
          json.forEach((chapter) => {
            var currentTime = Date.now()
            chapter.updateTime = timeDifference(currentTime / 1000, chapter.updateTime)
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
    // eslint-disable-next-line
  }, [chapterOffset])

  useEffect(() => {
    const fetchCommentListData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/v1/manga/' + mangaId + '/commentlist/' + commentOffset + '/' + commentsPerPage + '/', {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          }
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
              chapter.updateTime = timeDifference(currentTime / 1000, chapter.updateTime)
            })
            setCommentList(json.data)
            setNumberOfCommentPages(Math.ceil(json.totalCount / commentsPerPage))
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
    // eslint-disable-next-line
  }, [commentOffset])

  return (
    <div className='inner'>
      <div className='manga-header-wrapper'>
        <div className='manga-bg-img-wrapper'>
          <img className='manga-bg-img' src={manga.cover} alt='Manga Banner' />
        </div>
        <div className='manga-detail-wrapper'>
          <Grid container spacing={0}>
            <Grid item xs={5} md={3} sx={{ textAlign: 'center' }}>
              <img className='manga-cover' src={manga.cover} alt='Manga Cover' />
            </Grid>
            <Grid item xs={7} md={9}>
              <div className='right-manga-detail-wrapper'>
                <h1 className='manga-header'>{manga.title}</h1>
              </div>
              <div className='rating-wrapper'>
                <Rating
                  onChange={handleRating}
                  value={manga.userRating}
                />
                <p className='avg-rating-text'>(Trung bình: {manga.avgRating}/5 - {manga.ratingCount} lượt đánh giá)</p>
              </div>
              <div className="tag-list-wrapper">
                {manga.tags === undefined ? null : manga.tags.map((tag) => <div className="tag-wrapper">{tag}</div>)}
              </div>
              <div className='favorite-btn-wrapper'>
                <Button sx={{ borderRadius: '25px', backgroundColor: "#ED2939", "&:hover": { backgroundColor: "#cc0023" } }} variant="contained" onClick={handleFavorite} startIcon={<FavoriteIcon sx={{ color: manga.isFavorite ? 'orange' : 'white' }} />}>{manga.isFavorite ? "Bỏ theo dõi" : "Theo dõi"}</Button>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className='manga-status-wrapper'>
          <h5 className='manga-status'>
            <Circle sx={{ color: manga.status === 0 ? '#00FF00' : '#87CEEB', fontSize: '16px', marginRight: '10px' }} />
            {manga.status === 0 ? "Đang tiến hành" : "Đã hoàn thành"}
          </h5>
        </div>
        <div className='manga-author-wrapper'>
          <h5 className='manga-author'>Tác giả: {manga.author === "" ? "Đang cập nhật" : manga.author}</h5>
        </div>
        <div className='description-wrapper'>
          <h2 className='section-header'>Mô tả</h2>
          <p className={isDescExpand ? 'desc-paragraph' : 'short-desc-paragraph'}>
            {manga.description}
          </p>
          <a className='desc-expand' onClick={procDescParagraph}>{isDescExpand ? '< Thu gọn' : 'Xem thêm >'}</a>
        </div>
        <div className="manga-section-btn-wrapper" ref={pageRef}>
          <div className={currentSection === 'chapterlist' ? 'selected-manga-section-btn' : 'manga-section-btn'} id='chapterlist' onClick={handleSectionChange}>Danh sách chương</div>
          <div className={currentSection === 'commentlist' ? 'selected-manga-section-btn' : 'manga-section-btn'} id='commentlist' onClick={handleSectionChange}>Bình luận</div>
        </div>
        {mangaSection()}
      </div>
    </div>
  );
}

export default Manga;
