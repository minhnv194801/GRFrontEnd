import { useEffect, useState, useRef } from "react";
import ReactPaginate from 'react-paginate';
import ImageCarousel from "../../components/carousel/ImageCarousel";
import PaginateItemList from "../../components/paginateitem/PaginateItemList";
import {timeDifference} from '../../utils/Date'
import './Home.css'

function Home() {
  const itemsPerPage = 12
  const loadingItem = [{
    "id": "",
    "cover": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
    "name": "Loading...",
    "href": "",
    "chapters": []
  }]

  const pageRef = useRef(null)

  const [newItemOffset, setNewItemOffset] = useState(0)

  const [recommendedItems, setRecommendedItems] = useState([loadingItem])

  const [hotItems, setHotItems] = useState(loadingItem)

  const [forUserItems, setForUserItems] = useState([])

  const [newestItems, setNewestItems] = useState(loadingItem)

  const [numberOfPages, setNumberOfPages] = useState(1)
  
  const handlePageClick = (event) => {
    setNewItemOffset(event.selected * itemsPerPage);
  }
  
  useEffect(() => {
    // TODO: Fetching recommend manga from server
    const fetchRecommendData = async () => {
      const response = await fetch('http://localhost:8080/api/v1/home/recommend', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          "count": 10,
        })
      });
      // convert data to json
      const json = await response.json();

      if (json === null) {
        setRecommendedItems([])
      }
      json.forEach((respond) => {
        respond.href = '/manga/' + respond.id
      })
      setRecommendedItems(json)
    }

    const fetchHotItemsData = async () => {
      const response = await fetch('http://localhost:8080/api/v1/home/hot', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          "count": 10,
        })
      });
      // convert data to json
      const json = await response.json();

      if (json === null) {
        setHotItems([])
      }
      json.forEach((respond) => {
        respond.href = '/manga/' + respond.id
      })
      setHotItems(json)
    }

    const fetchTotalCount = async () => {
      const response = await fetch('http://localhost:8080/api/v1/home/count', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      // convert data to json
      const json = await response.json();

      setNumberOfPages(Math.ceil(json/itemsPerPage))
    }

    fetchHotItemsData()
    fetchRecommendData()
    // fetchTotalCount()
  }, [])
  
  useEffect(() => {
    //TODO: fetch newest items from backend
    //TODO: convert unix update time to string relative time
    const fetchNewestData = async () => {
      const response = await fetch('http://localhost:8080/api/v1/home/new', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          'count': itemsPerPage,
          'position': newItemOffset,
        })
      });
      // convert data to json
      const json = await response.json();
      
      if (json.data === null || json.data?.length === 0) {
        setNewestItems([])
        setNumberOfPages(1)
      }
      json.data.forEach((respond) => {
        respond.href = '/manga/' + respond.id
        var currentTime = Date.now()
        respond.chapters.forEach((chapter) => {
          chapter.href = '/read/' + chapter.id
          chapter.updateTime = timeDifference(currentTime/1000, chapter.updateTime)
        })
      })
      
      setNewestItems(json.data)
      setNumberOfPages(Math.ceil(json.totalCount/itemsPerPage))
    }
    
    setNewestItems(loadingItem)
    fetchNewestData()
    pageRef.current.scrollIntoView()
  }, [newItemOffset])

  return (
    <div className='outer'>
        <div className='inner'>
          <h1 className='page-title'>Nổi bật</h1>
            <div className='image-carousel-wrapper'>
              <ImageCarousel items={hotItems}/>
            </div>
          {
            recommendedItems.length === 0?
              <div></div>
            :
              <div>
                <h1 className='page-title'>Đề xuất</h1>
                <div className='image-carousel-wrapper'>
                  <ImageCarousel items={recommendedItems}/>
                </div>  
              </div>
          }
          {
            forUserItems.length === 0?
              <div></div>
            :
              <div>
                <h1 className='page-title'>Gợi ý cho bạn</h1>
                <div className='image-carousel-wrapper'>
                  <ImageCarousel items={forUserItems}/>
                </div>
              </div>
          }
          {
            newestItems.length === 0?
              <div></div>
            :
              <div>
                <h1 className='page-title' ref={pageRef}>Mới cập nhật</h1>
                  <PaginateItemList items={newestItems}/>
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
  
export default Home;