import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ReportIcon from '@mui/icons-material/Report';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useDispatch, useSelector } from 'react-redux'
import { displayFailure, displaySuccess } from '../../components/topalert/TopAlertSlice'
import "./Read.css"
import { login, logout } from "../../AppSlice";
import refreshTokenIfNeeded from "../../common/JWT";

function Read() {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sessionkey = useSelector((state) => state.app.sessionkey)
  const refreshkey = useSelector((state) => state.app.refreshkey)

  // eslint-disable-next-line
  const [chapterId, setChapterId] = useState(params.id)
  const [mangaTitle, setMangaTitle] = useState("")
  const [mangaHref, setMangaHref] = useState("")
  const [chapterTitle, setChapterTitle] = useState("")
  const [chapterList, setChapterList] = useState([{}])
  const [chapterImages, setChapterImages] = useState([])
  const [nextChapterHref, setNextChapterHref] = useState("")
  const [prevChapterHref, setPrevChapterHref] = useState("")
  const [openReportModal, setOpenReportModal] = useState(false);
  const [reportContent, setReportContent] = useState("");

  const handleOpenReportModal = () => setOpenReportModal(true);
  const handleCloseReportModal = () => setOpenReportModal(false);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: '25px',
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

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

  function changeChapter(e) {
    navigate("/read/" + e.target.value)
  }

  const sendReport = (e) => {
    const postReport = async () => {
      let newSessionkey = await refresh()
      try {
        const response = await fetch('http://localhost:8081/api/v1/report/' + chapterId, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Authorization': newSessionkey ? newSessionkey : sessionkey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'content': reportContent
          })
        })
        if (response.ok) {
          setOpenReportModal(false)

          dispatch(displaySuccess({
            "title": "Thành công",
            "content": "Báo lỗi đã được gửi thành công",
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
    postReport()
  }

  useEffect(() => {
    setChapterId(params.id)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let newSessionkey = await refresh()
        const response = await fetch('http://localhost:8081/api/v1/read/' + chapterId, {
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

          setMangaTitle(json.mangaTitle)
          setMangaHref("/manga/" + json.mangaId)
          setChapterTitle(json.title)
          setChapterImages(json.pages)
        } else {
          if (response.status === 401) {
            navigate("/")
            dispatch(displayFailure({
              "title": "Không có quyền sở hữu",
              "content": "Vui lòng mua truyện để bắt đầu đọc",
            }))
          } else {
            dispatch(displayFailure({
              "title": "Lỗi hệ thống",
              "content": "Gặp lỗi hệ thống khi tải chương truyện, xin vui lòng thử tải lại trang",
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

    const fetchChapterData = async () => {
      let newSessionkey = await refresh()
      try {
        const response = await fetch('http://localhost:8081/api/v1/read/' + chapterId + '/chapterlist', {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Authorization': newSessionkey ? newSessionkey : sessionkey,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const json = await response.json();

          setChapterList(json)
          let index = json.map(function (e) { return e.id; }).indexOf(chapterId);
          if (index > 0) {
            setPrevChapterHref("/read/" + json[index - 1].id)
          }
          if (index + 1 < json.length) {
            setNextChapterHref("/read/" + json[index + 1].id)
          }
        } else {
          dispatch(displayFailure({
            "title": "Lỗi hệ thống",
            "content": "Gặp lỗi hệ thống khi tải danh sách chương truyện, xin vui lòng thử tải lại trang",
          }))
        }
      } catch (error) {
        dispatch(displayFailure({
          "title": "Lỗi kết nối",
          "content": "Kết nối với server thất bại",
        }))
      }

    }

    fetchChapterData()
    fetchData()
    // eslint-disable-next-line
  }, [chapterId])

  return (
    <div className='outer'>
      <div className='inner-read'>
        <h1 className='title-header'>
          <a className='title-link' href={mangaHref}>{mangaTitle}</a> - {chapterTitle}
        </h1>
        <div className='report-wrapper'>
          <Button sx={{ borderRadius: '25px', backgroundColor: "#990000", color: "#ffffff", "&:hover": { backgroundColor: "#C00000" } }} variant="outlined" onClick={handleOpenReportModal} startIcon={<ReportIcon />}>
            Báo lỗi
          </Button>
        </div>
        <div className='chapter-selector-wrapper'>
          <Button sx={{ borderRadius: '50%', height: '30px', minWidth: '30px', maxWidth: '30px', marginTop: 'auto', marginBottom: 'auto', backgroundColor: "#990000", color: "#ffffff", "&:hover": { backgroundColor: "#C00000" } }} disabled={prevChapterHref === ""} variant="outlined" href={prevChapterHref}>
            <NavigateBeforeIcon />
          </Button>
          <select className='chapter-selector' onChange={changeChapter} value={chapterId}>
            {chapterList.map((chapter) => <option value={chapter.id}>{chapter.title}</option>)}
          </select>
          <Button sx={{ borderRadius: '50%', height: '30px', minWidth: '30px', maxWidth: '30px', marginTop: 'auto', marginBottom: 'auto', backgroundColor: "#990000", color: "#ffffff", "&:hover": { backgroundColor: "#C00000" } }} disabled={nextChapterHref === ""} variant="outlined" href={nextChapterHref}>
            <NavigateNextIcon />
          </Button>
        </div>
      </div>
      <div className='reading-box'>
        {chapterImages.map((image, index) => <img className='page-image' src={"https://storage.googleapis.com/datn-minh" + image} alt={"page " + index} />)}
      </div>
      <div className='inner-read'>
        <div className='chapter-selector-wrapper'>
          <Button sx={{ borderRadius: '25px', backgroundColor: "#990000", color: "#ffffff", "&:hover": { backgroundColor: "#C00000" }, marginRight: "30px" }} disabled={prevChapterHref === ""} variant="outlined" href={prevChapterHref}>
            <NavigateBeforeIcon /> Chương trước
          </Button>
          <Button sx={{ borderRadius: '25px', backgroundColor: "#990000", color: "#ffffff", "&:hover": { backgroundColor: "#C00000" }, marginLeft: "30px" }} disabled={nextChapterHref === ""} variant="outlined" href={nextChapterHref}>
            Chương sau <NavigateNextIcon />
          </Button>
        </div>
      </div>
      <Modal
        open={openReportModal}
        onClose={handleCloseReportModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <h3>Báo lỗi truyện</h3>
          <h4>Xin hãy nhập nội dung lỗi</h4>
          <TextField
            placeholder="Nội dung lỗi"
            sx={{ width: "100%" }}
            multiline
            rows={4}
            variant="outlined"
            onChange={(e) => setReportContent(e.target.value)}
          />
          <Button
            sx={{
              borderRadius: '25px',
              backgroundColor: "#990000",
              color: "#ffffff",
              "&:hover": { backgroundColor: "#C00000" },
              marginTop: 1
            }}
            variant="outlined"
            onClick={sendReport}
          >
            Gửi lỗi
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Read;
