import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import PaginateItemList from "../../components/paginateitem/PaginateItemList";
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { InputBase } from '@mui/material';
import './Search.css'
import { timeDifference } from "../../common/Date";
import { useDispatch } from "react-redux";
import { displayFailure } from "../../components/topalert/TopAlertSlice";

function Search() {
  const loadingItem = [{
    "id": "",
    "cover": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
    "name": "Loading...",
    "href": "",
    "chapters": []
  }]
  
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()

  const pageRef = useRef(null)
  const itemsPerPage = 12
  const searchTags = ["Action", "Adult", "Adventure", "Chuyển Sinh", "Comedy", "Comic", "Cooking", "Cổ Đại", "Doujinshi", "Drama", "Ecchi", "Fantasy", "Gender Bender", "Harem", "Historical", "Horror", "Josei", "Live action", "Manga", "Manhua", "Manhwa", "Martial Arts", "Mature", "Mystery", "Ngôn Tình", "Psychological", "Romance", "School Life", "Sci-fi", "Seinen", "Shoujo", "Shounen", "Slice of Life", "Smut", "Soft Yaoi", "Sports", "Supernatural", "Thiếu Nhi", "Tragedy", "Trinh Thám", "Truyện Màu", "Truyện scan", "Tạp chí truyện tranh", "Webtoon", "Xuyên Không", "Đam Mỹ"]
  
  const [searchValue, setSearchValue] = useState("")
  const [searchResultOffset, setSearchResultOffset] = useState(0)
  const [searchResults, setSearchResults] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [resultCount, setResultCount] = useState(0)
  const [numberOfPages, setNumberOfPages] = useState(1)
  
  const fetchSearchResult = async (searchValue, selectedTags) => {
    try {
      const response = await fetch('http://localhost:8081/api/v1/search', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          'query': searchValue,
          'tags': selectedTags,
          'count': itemsPerPage,
          'position': searchResultOffset,
        })
      });
      if (response.ok) {
        // convert data to json
        const json = await response.json();
      
        if (json.data === null || json.data?.length === 0) {
          setSearchResults([])
          setResultCount(0)
          setNumberOfPages(1)
        } else {
          json.data.forEach((respond) => {
            respond.href = '/manga/' + respond.id
            var currentTime = Date.now()
            respond.chapters.forEach((chapter) => {
              chapter.href = '/read/' + chapter.id
              chapter.updateTime = timeDifference(currentTime/1000, chapter.updateTime)
            })
          })
          
          setSearchResults(json.data)
          setResultCount(json.totalCount)
          setNumberOfPages(Math.ceil(json.totalCount/itemsPerPage))
        }
      } else {
        setSearchResults([])
        setResultCount(0)
        setNumberOfPages(1)
        dispatch(displayFailure({
          "title": "Lỗi hệ thống",
          "content": "Gặp lỗi hệ thống khi tải truyện, xin vui lòng thử tải lại trang",
        }))
      }
    } catch (error) {
      dispatch(displayFailure({
        "title": "Lỗi kết nối",
        "content": "Kết nối với server thất bại",
      }))
    }
    
  }

  const handlePageClick = (event) => {
    setSearchResultOffset(event.selected * itemsPerPage);
  }

  function handleKeyPress(e) {
    if (e.keyCode === 13){
      let url = "/search?value=" + e.target.value + "&tags="
      selectedTags.forEach((tag) => {
        url += tag + ","
      })
      url = url.slice(0, -1); 
      window.location.href = url
    }
  }

  function handleSearchClicked(e) {
    let url = "/search?value=" + searchValue + "&tags="
    selectedTags.forEach((tag) => {
      console.log(tag)
      url += tag + ","
    })
    url = url.slice(0, -1); 
    window.location.href = url
  }

  function handleCheckBox(e, isChecked) {
    if (isChecked) {
      setSelectedTags([...selectedTags, e.target.value])
    } else {
      setSelectedTags((state) => state.filter((tag) => tag !== e.target.value))
    }
  }

  useEffect(() => {
    if (searchParams.get('tags') != null) {
      setSelectedTags(searchParams.get('tags').split(","))
      var tags = searchParams.get('tags').split(",")
    }
    if (searchParams.get('value') != null) {
      setSearchValue(searchParams.get('value'))
      var value = searchParams.get('value')
    }

    fetchSearchResult(value, tags)
    
    setSearchResults(loadingItem)
    
    pageRef.current.scrollIntoView()
    // eslint-disable-next-line
  }, [searchResultOffset])

  return (
    <div className='outer'>
      <div className='inner'>
        <h1 className='search-header'>Tìm Kiếm</h1>
        <div className='search-text-input'>
          <FormControl variant="standard" fullWidth>
          <InputBase className='search-text-input' 
              sx={{borderRadius: '25px', backgroundColor: '#fff'}}
              placeholder="Tìm kiếm" 
              value={searchValue}
              fullWidth
              onChange={(e) => {setSearchValue(e.target.value)}}
              onKeyDown={handleKeyPress}
              startAdornment={
                  <InputAdornment position="start">
                  <SearchIcon />
                  </InputAdornment>
              }/>
          </FormControl>
        </div>
        <Grid className="checkbox-grid" container spacing={2}>
          {searchTags.map((tag) => 
            <Grid item xs={6} md={2} key={tag}>
              <FormGroup key={tag}>
                <FormControlLabel control={<Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleOutlineIcon />} checked={selectedTags.includes(tag)} value={tag} onChange={handleCheckBox}/>} label={tag} />
              </FormGroup>
            </Grid>
          )}
        </Grid>
        <div className='button-div'>
          <Button sx={{borderRadius: '25px', backgroundColor:"#990000", "&:hover": {backgroundColor: "#c00000"}}} className='search-button' variant="contained" onClick={handleSearchClicked}>Tìm kiếm</Button>
        </div>
        <h2 ref={pageRef}>Kết quả tìm kiếm</h2>
        <h4 ref={pageRef}>Hiển thị {searchResults.length} trên {resultCount} kết quả</h4>
          {searchResults.length === 0?
            <div></div>
            :
            <div>
              <PaginateItemList items={searchResults}/>
              <div className="page-paginate">
                <ReactPaginate
                  nextLabel=">"
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={2}
                  pageCount={numberOfPages}
                  onPageChange={handlePageClick}
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
  );
}
  
  export default Search;
  