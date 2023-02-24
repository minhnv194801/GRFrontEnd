import { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Rating } from 'react-simple-star-rating'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch } from 'react-redux'
import { displaySuccess } from '../../components/topalert/TopAlertSlice'
import { timeDifference } from "../../utils/Date";
import './Manga.css'

function Manga() {
  const chaptersPerPage = 5
  const commentsPerPage = 6
  
  const params = useParams()
  const chapterListRef = useRef(null)
  const commentListRef = useRef(null)
  const dispatch = useDispatch()

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
    setManga({
      ...manga,
      isFavorite: !manga.isFavorite
    });

    // TODO: Display favorite result
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
  }

  const handleRating = (rate) => {
    // TODO: Send rating to server
    console.log(rate)

    // TODO: Display rating result
    dispatch(displaySuccess({
      "title": "Thành công",
      "content": "Đánh giá đã được gửi thành công",
    }))
  }

  const handleCommentBoxChange = (e) => {
    setCurrentComment(e.target.value)
  }

  const handleCommentSubmition = (e) => {
    // TODO: Send comment to server
    console.log(currentComment)
    setCommentList([
      {
        "username": "User",
        "avatar": "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg",
        "content": currentComment,
        "updateTime": "vừa xong",
      },
      ...commentList
    ])

    // TODO: Display comment result
    dispatch(displaySuccess({
      "title": "Thành công",
      "content": "Bình luận đã được đăng thành công",
    }))
  }

  const handleReadChapter = (e) => {
    window.location.href = '/read/' + e.target.value;
  }

  useEffect(() => {
    // TODO: fetch manga data from backend
    const fetchMangaInfo = async () => {
      const response = await fetch('http://localhost:8080/api/v1/manga/' + mangaId, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      // convert data to json
      const json = await response.json();

      setManga(json)
      setNumberOfChapterPages(Math.ceil(json.chapterCount / chaptersPerPage))
    }

    fetchMangaInfo()

    // TODO: fetch comment list of the manga
    // TODO: fetch number of comment then calculate number of pages
    setNumberOfCommentPages(1)
    let fetchedCommentList = [{}]
    setCommentList(fetchedCommentList)
  }, [])

  useEffect(() => {
    // TODO: fetch chapter list of the manga
    // TODO: fetch number of chapter then calculate number of pages
    // TODO: updateTime from unix time to relative time in string
    const fetchChapterListInfo = async () => {
      const response = await fetch('http://localhost:8080/api/v1/manga/' + mangaId + '/chapterlist', {
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
      // convert data to json
      const json = await response.json();

      console.log(json)
      json.forEach((chapter) => {
        var currentTime = Date.now()
        chapter.updateTime = timeDifference(currentTime/1000, chapter.updateTime)
      })
      setChapterList(json)
    }
    fetchChapterListInfo()
    // setNumberOfChapterPages(3)
    // let fetchedChapterList = [
    //   {
    //     "id": "Chapter 1",
    //     "title": "Chapter 1",
    //     "cover": "https://st.ntcdntempv3.com/data/comics/220/naruto-cuu-vi-ho-ly.jpg",
    //     "price": 5000,
    //     "isOwned": true,
    //     "updateTime": "1 ngày trước",
    //   },
    //   {
    //     "id": "Chapter 2",
    //     "title": "Chapter 2",
    //     "cover": "https://st.ntcdntempv3.com/data/comics/220/naruto-cuu-vi-ho-ly.jpg",
    //     "price": 5000,
    //     "isOwned": true,
    //     "updateTime": "7 ngày trước",
    //   },
    //   {
    //     "id": "Chapter 3",
    //     "title": "Chapter 3",
    //     "cover": "https://st.ntcdntempv3.com/data/comics/220/naruto-cuu-vi-ho-ly.jpg",
    //     "price": 5000,
    //     "isOwned": false,
    //     "updateTime": "14 ngày trước",
    //   }
    // ]
    // setChapterList(fetchedChapterList)
  }, [chapterOffset])

  useEffect(() => {
    // TODO: fetch comment list of the manga
    // TODO: fetch number of comment then calculate number of pages
    // TODO: updateTime from unix time to relative time in string
    const fetchCommentListData = async () => {
      const response = await fetch('http://localhost:8080/api/v1/manga/' + mangaId + '/commentlist', {
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
      // convert data to json
      const json = await response.json();

      console.log(json)
      if (json === null) {
        setCommentList([])
      }
      json.forEach((chapter) => {
        var currentTime = Date.now()
        chapter.updateTime = timeDifference(currentTime/1000, chapter.updateTime)
      })
      setCommentList(json)
    }

    const fetchCommentListCount = async () => {
      const response = await fetch('http://localhost:8080/api/v1/manga/' + mangaId + '/comment/count', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      // convert data to json
      const json = await response.json();

      setNumberOfCommentPages(Math.ceil(json/commentsPerPage))
    }

    fetchCommentListCount()
    fetchCommentListData()

    // setNumberOfCommentPages(2)
    // let fetchedCommentList = [
    //   {
    //     "username": "User 1",
    //     "avatar": "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg",
    //     "content": "Bình luận 1",
    //     "updateTime": "1 ngày trước",
    //   },
    //   {
    //     "username": "User 2",
    //     "avatar": "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg",
    //     "content": "Bình luận 2",
    //     "updateTime": "2 ngày trước",
    //   },
    //   {
    //     "username": "User 3",
    //     "avatar": "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg",
    //     "content": "Bình luận 3",
    //     "updateTime": "3 ngày trước",
    //   },
    // ]
    // setCommentList(fetchedCommentList)
  }, [commentOffset])

  return (
    <div className='outer'>
      <div className='inner'>
        <h1 className='manga-title-header'>{manga.title}</h1>
        <div className='cover-wrapper'>
          <img className="manga-cover" src={manga.cover} alt='bìa truyện' />
        </div>
        <div className='favorite-btn-wrapper'>
          <Button sx={{ backgroundColor: "#990000", "&:hover": { backgroundColor: "#C00000" } }} variant="contained" onClick={handleFavorite} startIcon={<FavoriteIcon />}>{manga.isFavorite ? "Bỏ theo dõi" : "Theo dõi"}</Button>
        </div>
        <div className="info-grid">
          <Grid container>
            <Grid item md={6}>
              <b>
                Tác giả:
              </b>
            </Grid>
            <Grid item md={6}>
              <p>
                {manga.author===""?"Đang cập nhật":manga.author}
              </p>
            </Grid>
            <Grid item md={6}>
              <b>
                Tình trạng:
              </b>
            </Grid>
            <Grid item md={6}>
              <p>
                {manga.status===0?"Đang tiến hành":"Đã hoàn thành"}
              </p>
            </Grid>
            <Grid item md={6}>
              <b>
                Thể loại:
              </b>
            </Grid>
            <Grid item md={6}>
              <p>
                {manga.tags.join(" - ")}
              </p>
            </Grid>
            <Grid item md={6}>
              <b>
                Đánh giá:
              </b>
            </Grid>
            <Grid item md={6}>
              <Rating
                onClick={handleRating}
              />
            </Grid>
            <Grid item md={6}>
            </Grid>
            <Grid item md={6}>
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
                      (!chapter.isOwned&&chapter.price !== 0) ?
                        <div>
                          <h6>
                            {chapter.price + " VND"}
                          </h6>
                          <Button sx={{ backgroundColor: "#ed2939", "&:hover": { backgroundColor: "#cc0023" } }} variant="contained">Mua</Button>
                        </div>
                        :
                        <div>
                          <Button sx={{ backgroundColor: "#990000", "&:hover": { backgroundColor: "#C00000" } }} value={chapter.id} onClick={handleReadChapter} variant="contained">Đọc</Button>
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
          <Button sx={{ backgroundColor: "#990000", "&:hover": { backgroundColor: "#C00000" }, marginLeft:"80%", marginTop:"10px"}} onClick={handleCommentSubmition} variant="contained">Bình luận</Button>
          <h2 className='section-header' ref={commentListRef}>Bình luận</h2>
          <div className="comment-list-wrapper">
            {
              commentList.length === 0?
              <div>Chưa có ai bình luận. Hay bạn là người đầu tiên nhé!</div>
              :
              <div>
              {commentList.map((comment) => 
                <Grid container>
                <Grid item md={2} sx={{textAlign:"center"}}>
                  <img className="comment-avatar" src={comment.avatar} alt="user-avatar"/>
                </Grid>
                <Grid item md={10}>
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
              </div>  
            }
          </div>
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
      </div>
    </div>
  );
}

export default Manga;
