import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ReportIcon from '@mui/icons-material/Report';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useDispatch } from 'react-redux'
import { displaySuccess } from '../../components/topalert/TopAlertSlice'
import "./Read.css"

function Read() {
  const params = useParams()
  const dispatch = useDispatch()
  
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
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  function changeChapter(e) {
    window.location.href = "/read/" + e.target.value;
  }

  function sendReport(e) {
    // TODO: send report to backend
    console.log(reportContent)

    setOpenReportModal(false)

    // TODO: Receive respond and display result correctly
    dispatch(displaySuccess({
      "title": "Thành công",
      "content": "Báo lỗi đã được gửi thành công",
    }))
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/api/v1/read/' + chapterId, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Authorization': "sessionid", 
          'Content-Type': 'application/json'
        }
      });
      // convert data to json
      const json = await response.json();

      console.log(json)
      setMangaTitle(json.mangaTitle)
      setMangaHref("/manga/"+json.mangaId)
      setChapterTitle(json.title)
      setChapterImages(json.pages)

      // setChapterList(json.chapterList)
      // let index = json.chapterList.map(function(e) { return e.id; }).indexOf(chapterId);
      // if (index > 0) {
      //   setPrevChapterHref("/read/" + json.chapterList[index-1].id)
      // }
      // if (index + 1 < json.chapterList.length) {
      //   setNextChapterHref("/read/" + json.chapterList[index+1].id)
      // }
    }

    const fetchChapterData = async () => {
      const response = await fetch('http://localhost:8080/api/v1/read/' + chapterId + '/chapterlist', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Authorization': "sessionid", 
          'Content-Type': 'application/json'
        }
      });
      // convert data to json
      const json = await response.json();
      console.log(json)

      setChapterList(json)
      let index = json.map(function(e) { return e.id; }).indexOf(chapterId);
      if (index > 0) {
        setPrevChapterHref("/read/" + json[index-1].id)
      }
      if (index + 1 < json.length) {
        setNextChapterHref("/read/" + json[index+1].id)
      }
    }

    fetchChapterData()
    fetchData()
    // eslint-disable-next-line
  }, [])

  return (
  <div className='outer'>
    <div className='inner-read'>
      <h1 className='title-header'>
        <a className='title-link' href={mangaHref}>{mangaTitle}</a> - {chapterTitle}
      </h1>
      <div className='report-wrapper'>
        <Button sx={{backgroundColor: "#990000", color: "#ffffff", "&:hover": {backgroundColor: "#C00000"}}} variant="outlined" onClick={handleOpenReportModal} startIcon={<ReportIcon />}>
          Báo lỗi
        </Button>
      </div>
      <div className='chapter-selector-wrapper'>
        <Button sx={{backgroundColor: "#990000", color: "#ffffff", "&:hover": {backgroundColor: "#C00000"}}} disabled={prevChapterHref === ""} variant="outlined" href={prevChapterHref}>
          <NavigateBeforeIcon />
        </Button>
        <select className='chapter-selector' onChange={changeChapter} value={chapterId}>
          {chapterList.map((chapter) => <option value={chapter.id}>{chapter.title}</option>)}
        </select>
        <Button sx={{backgroundColor: "#990000", color: "#ffffff", "&:hover": {backgroundColor: "#C00000"}}} disabled={nextChapterHref === ""} variant="outlined" href={nextChapterHref}>
          <NavigateNextIcon />
        </Button>
      </div>
    </div>
    <div className='reading-box'>
      {chapterImages.map((image, index) => <img className='page-image' src={image} alt={"page " + index}/>)}
    </div>
    <div className='inner-read'>
    <div className='chapter-selector-wrapper'>
        <Button sx={{backgroundColor: "#990000", color: "#ffffff", "&:hover": {backgroundColor: "#C00000"}, marginRight:"30px"}} disabled={prevChapterHref === ""} variant="outlined" href={prevChapterHref} startIcon={<NavigateBeforeIcon/>}>
          Chương trước
        </Button>
        <Button sx={{backgroundColor: "#990000", color: "#ffffff", "&:hover": {backgroundColor: "#C00000"}, marginLeft:"30px"}} disabled={nextChapterHref === ""} variant="outlined" href={nextChapterHref} startIcon={<NavigateNextIcon/>}>
          Chương sau
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
          sx={{width: "100%"}}
          multiline
          rows={4}
          variant="outlined"
          onChange={(e) => setReportContent(e.target.value)}
        />
      <Button sx={{backgroundColor: "#990000", color: "#ffffff", "&:hover": {backgroundColor: "#C00000"}, marginTop:1}} variant="outlined" onClick={sendReport}>
        Gửi lỗi
      </Button>
      </Box>
    </Modal>
  </div>
  );
}

export default Read;
