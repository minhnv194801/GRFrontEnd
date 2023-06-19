import { useEffect, useState, useRef } from "react";
import ReactPaginate from 'react-paginate';
import Grid from '@mui/material/Grid';
import { useDispatch } from "react-redux";
import ImageCarousel from "../../components/carousel/ImageCarousel";
import NewsPaginateItemList from "./newspaginateitem/NewsPaginateItemList";
import { timeDifference } from '../../common/Date'
import { displayFailure } from '../../components/topalert/TopAlertSlice';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css/pagination";
import 'swiper/css';
import './Home.css'

function Home() {
  const itemsPerPage = 12
  const hotItemCount = 10
  const recommendItemCount = 10
  const loadingItem = [{
    "id": "",
    "cover": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
    "name": "Loading...",
    "href": "",
    "chapters": []
  }]

  const pageRef = useRef(null)
  const dispatch = useDispatch()

  const [newItemOffset, setNewItemOffset] = useState(0)

  const [recommendedItems, setRecommendedItems] = useState([loadingItem])

  const [hotItems, setHotItems] = useState(loadingItem)

  const [forUserItems] = useState([])

  const [newestItems, setNewestItems] = useState(loadingItem)

  const [numberOfPages, setNumberOfPages] = useState(1)

  const handlePageClick = (event) => {
    setNewItemOffset(event.selected * itemsPerPage);
  }

  useEffect(() => {
    const fetchRecommendData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/v1/home/recommend/' + recommendItemCount + '/', {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          // convert data to json
          const json = await response.json();

          if (json === null) {
            setRecommendedItems([])
          }
          json.forEach((respond) => {
            respond.href = '/manga/' + respond.id
          })
          setRecommendedItems(json)
        } else {
          setRecommendedItems([])
          dispatch(displayFailure({
            "title": "Lỗi hệ thống",
            "content": "Gặp sự cố hệ thống khi tải thông tin danh sách truyện đề cử, xin vui lòng thử tải lại trang",
          }))
        }
      } catch (error) {
        dispatch(displayFailure({
          "title": "Lỗi kết nối",
          "content": "Kết nối với server thất bại",
        }))
      }
    }

    const fetchHotItemsData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/v1/home/hot/' + hotItemCount + '/', {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          // convert data to json
          const json = await response.json();

          if (json === null) {
            setHotItems([])
          }
          json.forEach((respond) => {
            respond.href = '/manga/' + respond.id
          })
          setHotItems(json)
        } else {
          setHotItems([])
          dispatch(displayFailure({
            "title": "Lỗi hệ thống",
            "content": "Gặp sự cố hệ thống khi tải thông tin truyện nổi bật, xin vui lòng thử tải lại trang",
          }))
        }
      } catch (error) {
        dispatch(displayFailure({
          "title": "Lỗi kết nối",
          "content": "Kết nối với server thất bại",
        }))
      }

    }

    fetchHotItemsData()
    fetchRecommendData()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const fetchNewestData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/v1/home/new/' + newItemOffset + '/' + itemsPerPage + '/', {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (response.ok) {
          // convert data to json
          const json = await response.json();

          if (json.data === null || json.data?.length === 0) {
            setNewestItems([])
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

            setNewestItems(json.data)
            setNumberOfPages(Math.ceil(json.totalCount / itemsPerPage))
          }
        } else {
          setNewestItems([])
          setNumberOfPages(1)
          dispatch(displayFailure({
            "title": "Lỗi hệ thống",
            "content": "Gặp sự cố hệ thống khi tải danh sách truyện mới cập nhật, xin vui lòng thử tải lại trang",
          }))
        }
      } catch (error) {
        dispatch(displayFailure({
          "title": "Lỗi kết nối",
          "content": "Kết nối với server thất bại",
        }))
      }
    }

    setNewestItems(loadingItem)
    fetchNewestData()
    // eslint-disable-next-line
  }, [newItemOffset])

  return (
    <div className='outer'>
      <div className='inner'>
        <h1 className='page-title'>Nổi bật</h1>
        {
          hotItems.length === 0 ?
            null
            :
            <Swiper
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              loop
              modules={[Autoplay, Pagination]}
              className="mySwiper"
            >
              {hotItems.map((item) =>
                <SwiperSlide key={item.id}>
                  <a href={item.href} className="hidden-href">
                    <Grid container sx={{ width: '100%', height: '100%' }}>
                      <img src={item.image} className="test-bg-image" alt="Banner Cover"></img>
                      <Grid item xs={5} md={3}>
                        <div className="notable-img-wrapper">
                          <img src={item.image} className="test-main-img" alt="Main Cover"></img>
                        </div>
                      </Grid>
                      <Grid item xs={7} md={9} className="test-header">
                        <h1 className="test-title">{item.title}</h1>
                        <div className="tag-list-wrapper">
                          {item.tags === undefined ? null : item.tags.map((tag) => <div className="tag-wrapper">{tag}</div>)}
                        </div>
                        <h4 className="desc-wrapper">{item.description}</h4>
                      </Grid>
                    </Grid>
                  </a>
                </SwiperSlide>
              )}
            </Swiper>
        }
        {
          recommendedItems.length === 0 ?
            <div></div>
            :
            <div>
              <h1 className='page-title'>Đề xuất</h1>
              <div className='image-carousel-wrapper'>
                <ImageCarousel items={recommendedItems} />
              </div>
            </div>
        }
        {
          newestItems.length === 0 ?
            <div></div>
            :
            <div>
              <h1 className='page-title' ref={pageRef}>Mới cập nhật</h1>
              <NewsPaginateItemList items={newestItems} />
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
        {
          forUserItems.length === 0 ?
            <div></div>
            :
            <div>
              <h1 className='page-title'>Gợi ý cho bạn</h1>
              <div className='image-carousel-wrapper'>
                <ImageCarousel items={forUserItems} />
              </div>
            </div>
        }
      </div>
    </div>
  );
}

export default Home;