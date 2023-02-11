import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ReportIcon from '@mui/icons-material/Report';
import "./Read.css"
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function Read() {
  const params = useParams();
  
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
  }

  useEffect(() => {
    // TODO: fetch manga title and chapter title from backend
    setMangaTitle("Item 1")
    setMangaHref("/manga")
    setChapterTitle("Chapter 1")

    // TODO: fetch list chapter of the manga from backend
    let fetchedChapterList = [
      {
        "title": "Chapter 1",
        "id": "Chapter 1",
      },
      {
        "title": "Chapter 2",
        "id": "Chapter 2",
      },
      {
        "title": "Chapter 3",
        "id": "Chapter 3",
      }
    ]
    setChapterList(fetchedChapterList)
    let index = fetchedChapterList.map(function(e) { return e.id; }).indexOf(chapterId);
    if (index > 0) {
      setPrevChapterHref("/read/" + fetchedChapterList[index-1].id)
    }
    if (index + 1 < fetchedChapterList.length) {
      setNextChapterHref("/read/" + fetchedChapterList[index+1].id)
    }

    // TODO: fetch chapter pages
    let fetchedChapterPages = ["/Manga/page1.jpg", "/Manga/page2.jpg", "/Manga/page3.jpg"]
    setChapterImages(fetchedChapterPages)
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
      {chapterImages.map((image, index) => <img src={image} alt={"page " + index}/>)}
    </div>
    <div className='inner-read'>
    <div className='chapter-selector-wrapper'>
        <Button sx={{backgroundColor: "#990000", color: "#ffffff", "&:hover": {backgroundColor: "#C00000"}, marginRight:30}} disabled={prevChapterHref === ""} variant="outlined" href={prevChapterHref} startIcon={<NavigateBeforeIcon/>}>
          Chương trước
        </Button>
        <Button sx={{backgroundColor: "#990000", color: "#ffffff", "&:hover": {backgroundColor: "#C00000"}, marginLeft:30}} disabled={nextChapterHref === ""} variant="outlined" href={nextChapterHref} startIcon={<NavigateNextIcon/>}>
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
          onChange={(e) => setReportContent(e.targer.value)}
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
