import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import SearchPaginateItemList from "./searchpaginateitem/SearchPaginateItemList";
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import { timeDifference } from "../../common/Date";
import { useDispatch } from "react-redux";
import { displayFailure } from "../../components/topalert/TopAlertSlice";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import './Search.css'
import CONFIG from "../../common/Config";

const buttonStyle = {
  backgroundColor: '#ed2939',
  "&:hover": { backgroundColor: "#cc0023" },
  borderRadius: '25px',
  height: '3vh',
  minHeight: '25px',
  marginTop: 'auto',
  marginBottom: 'auto',
}

const tagsExpandIconStyle = {
  "&:hover": {
    cursor: "pointer",
  },
}

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
  // const searchTags = ["Action", "Adult", "Adventure", "Chuyển Sinh", "Comedy", "Comic", "Cooking", "Cổ Đại", "Doujinshi", "Drama", "Ecchi", "Fantasy", "Gender Bender", "Harem", "Historical", "Horror", "Josei", "Live action", "Manga", "Manhua", "Manhwa", "Martial Arts", "Mature", "Mystery", "Ngôn Tình", "Psychological", "Romance", "School Life", "Sci-fi", "Seinen", "Shoujo", "Shounen", "Slice of Life", "Smut", "Soft Yaoi", "Sports", "Supernatural", "Thiếu Nhi", "Tragedy", "Trinh Thám", "Truyện Màu", "Truyện scan", "Tạp chí truyện tranh", "Webtoon", "Xuyên Không", "Đam Mỹ"]

  const [searchValue, setSearchValue] = useState("")
  const [searchResultOffset, setSearchResultOffset] = useState(0)
  const [searchResults, setSearchResults] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [searchTags, setSearchTags] = useState(CONFIG.TAG_LIST)
  const [selectedTagsVisibility, setSelectedTagsVisibility] = useState(false)
  const [searchTagsVisibility, setSearchTagsVisibility] = useState(true)
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
        console.log(json.data)

        if (json.data === null || json.data?.length === 0) {
          setSearchResults([])
          setResultCount(0)
          setNumberOfPages(1)
        } else {
          json.data.forEach((respond) => {
            respond.href = '/manga/' + respond.id
            var currentTime = Date.now()
            if (respond.chapters) {
              respond.chapters.forEach((chapter) => {
                chapter.href = '/read/' + chapter.id
                chapter.updateTime = timeDifference(currentTime / 1000, chapter.updateTime)
              })
            }
          })

          setSearchResults(json.data)
          setResultCount(json.totalCount)
          setNumberOfPages(Math.ceil(json.totalCount / itemsPerPage))
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

  const handleExpandSearchTags = (event) => {
    setSearchTagsVisibility(!searchTagsVisibility)
  }

  const handleExpandSelectedTags = (event) => {
    setSelectedTagsVisibility(!selectedTagsVisibility)
  }

  const handleAddSelectedTags = (event) => {
    let filteredArray = searchTags.filter(item => item !== event.target.id)
    setSearchTags(filteredArray)

    setSelectedTags(prevState => ([...prevState, event.target.id]))
    setSelectedTagsVisibility(true)
  }

  const handleRemoveSelectedTags = (event) => {
    let filteredArray = selectedTags.filter(item => item !== event.target.id)
    setSelectedTags(filteredArray)

    setSearchTags(prevState => ([...prevState, event.target.id].sort()))
  }

  const handlePageClick = (event) => {
    setSearchResultOffset(event.selected * itemsPerPage);
  }

  function handleKeyPress(e) {
    if (e.keyCode === 13) {
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

  useEffect(() => {
    if (searchParams.get('tags') != null) {
      var tags = searchParams.get('tags').split(",")
      setSelectedTags(tags.filter(tag => tag !== ""))
      let filteredArray = searchTags.filter(item => !tags.includes(item))
      setSearchTags(filteredArray)
    }
    if (searchParams.get('value') != null) {
      var value = searchParams.get('value')
      setSearchValue(value)
    }

    setSearchResults(loadingItem)

    fetchSearchResult(value, tags)

    pageRef.current.scrollIntoView()
    // eslint-disable-next-line
  }, [searchResultOffset])

  return (
    <div className='inner'>
      <div className='search-container'>
        <h1 className='search-header'>Tìm Kiếm</h1>
        <div className="search-text-wrapper">
          <div className='search-text-input'>
            <FormControl variant="standard" fullWidth>
              <InputBase className='search-text-input'
                sx={{ borderRadius: '25px', backgroundColor: '#fff' }}
                placeholder="Tìm kiếm"
                value={searchValue}
                fullWidth
                onChange={(e) => { setSearchValue(e.target.value) }}
                onKeyDown={handleKeyPress}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                } />
            </FormControl>
          </div>
          <Button sx={buttonStyle} variant="contained" onClick={handleSearchClicked}>Tìm</Button>
        </div>
        <h2 className="search-page-title">Đã chọn {"(" + selectedTags.length + ")"} {selectedTagsVisibility ? <KeyboardArrowUp fontSize="large" sx={tagsExpandIconStyle} onClick={handleExpandSelectedTags} /> : <KeyboardArrowDown fontSize="large" sx={tagsExpandIconStyle} onClick={handleExpandSelectedTags} />}</h2>
        {
          selectedTagsVisibility ?
            <div className="search-tag-list-wrapper">
              {selectedTags.map((tag) =>
                <div className="search-tag-wrapper" id={tag} onClick={handleRemoveSelectedTags}>{tag}</div>
              )}
            </div>
            : null
        }
        <h2 className="search-page-title">Thể loại {searchTagsVisibility ? <KeyboardArrowUp fontSize="large" sx={tagsExpandIconStyle} onClick={handleExpandSearchTags} /> : <KeyboardArrowDown fontSize="large" sx={tagsExpandIconStyle} onClick={handleExpandSearchTags} />}</h2>
        {
          searchTagsVisibility ?
            <div className="search-tag-list-wrapper">
              {searchTags.map((tag) =>
                <div className="search-tag-wrapper" id={tag} onClick={handleAddSelectedTags}>{tag}</div>
              )}
            </div>
            : null
        }
        <h2 className="search-page-title" ref={pageRef}>Kết quả tìm kiếm</h2>
        <h4 className="search-page-title" ref={pageRef}>Hiển thị {searchResults.length} trên {resultCount} kết quả</h4>
        {searchResults.length === 0 ?
          <div></div>
          :
          <div>
            <SearchPaginateItemList items={searchResults} />
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
