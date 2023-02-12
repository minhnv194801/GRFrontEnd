import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import PaginateItemList from "../components/paginateitem/PaginateItemList";
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import './Search.css'

function Search() {
  const [searchParams] = useSearchParams()

  const pageRef = useRef(null)
  const itemsPerPage = 9
  const searchTags = ["Action", "Adult", "Adventure", "Chuyển Sinh", "Comedy", "Comic", "Cooking", "Cổ Đại", "Doujinshi", "Drama", "Ecchi", "Fantasy", "Gender Bender", "Harem", "Historical", "Horror", "Josei", "Live action", "Manga", "Manhua", "Manhwa", "Martial Arts", "Mature", "Mystery", "Ngôn Tình", "Psychological", "Romance", "School Life", "Sci-fi", "Seinen", "Shoujo", "Shounen", "Slice of Life", "Smut", "Soft Yaoi", "Sports", "Supernatural", "Thiếu Nhi", "Tragedy", "Trinh Thám", "Truyện Màu", "Truyện scan", "Tạp chí truyện tranh", "Webtoon", "Xuyên Không", "Đam Mỹ"]

  const [searchValue, setSearchValue] = useState("")
  const [searchResultOffset, setSearchResultOffset] = useState(0)
  const [searchResults, setSearchResults] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [numberOfPages, setNumberOfPages] = useState(1)

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
      window.location.href = url;
    }
  }

  function handleSearchClicked(e) {
    let url = "/search?value=" + searchValue + "&tags="
    selectedTags.forEach((tag) => {
      console.log(tag)
      url += tag + ","
    })
    url = url.slice(0, -1); 
    window.location.href = url;
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
    }
    if (searchParams.get('value') != null) {
      setSearchValue(searchParams.get('value'))
    }

    //TODO: fetch number of results from server then calculate number of page
    setNumberOfPages(5)
    //TODO: fetch search results from backend
    var respond = []
    for (var i = searchResultOffset; i < searchResultOffset + itemsPerPage; i++) {
      var item = {
        "cover": "https://st.ntcdntempv3.com/data/comics/220/naruto-cuu-vi-ho-ly.jpg",
        "href": "/manga/Item",
        "name": "Item " + i,
        "chapters": [
          {
            "name": "Chapter 1",
            "href": "/read/Chapter 1",
            "updateTime": "1 ngày trước",
          },
          {
            "name": "Chapter 2",
            "href": "/read/Chapter 2",
            "updateTime": "7 ngày trước",
          },
          {
            "name": "Chapter 3",
            "href": "/read/Chapter 3",
            "updateTime": "14 ngày trước",
          },
        ]
      }
      respond.push(item)
    }
    setSearchResults(respond)
    pageRef.current.scrollIntoView()
    // eslint-disable-next-line
  }, [searchResultOffset])

  return (
    <div className='outer'>
      <div className='inner'>
        <h1 className='search-header'>Tìm Kiếm</h1>
        <div className='search-text-input'>
          <FormControl variant="standard">
          <InputBase className='search-text-input' 
              placeholder="Tìm kiếm" 
              value={searchValue}
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
            <Grid item xs={6} md={2}>
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={selectedTags.includes(tag)} value={tag} onChange={handleCheckBox}/>} label={tag} />
              </FormGroup>
            </Grid>
          )}
        </Grid>
        <div className='button-div'>
          <Button sx={{backgroundColor:"#990000", "&:hover": {backgroundColor: "#C00000"}}} className='search-button' variant="contained" onClick={handleSearchClicked}>Tìm kiếm</Button>
        </div>
        <h2 ref={pageRef}>Kết quả tìm kiếm</h2>
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
    </div>
  );
}
  
  export default Search;
  