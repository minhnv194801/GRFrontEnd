import { useEffect, useState, useRef } from "react";
import ReactPaginate from 'react-paginate';
import ImageCarousel from "../../components/carousel/ImageCarousel";
import PaginateItemList from "../../components/paginateitem/PaginateItemList";
import './Home.css'

function Home() {
  const pageRef = useRef(null)
  const itemsPerPage = 9

  const [newItemOffset, setNewItemOffset] = useState(0)

  const [recommendedItems, setRecommendedItems] = useState([{
    "id": "",
    "title": "Loading...",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
    "href": "",
  }])

  const [hotItems, setHotItems] = useState([{
    "id": "",
    "title": "Loading...",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
    "href": "",
  }])

  const [forUserItems, setForUserItems] = useState([{
    "id": "",
    "title": "Loading...",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
    "href": "",
  }])

  const [newestItems, setNewestItems] = useState([{
    "id": "",
    "cover": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
    "name": "Loading...",
    "href": "",
    "chapters": [
    ]
  }])

  const [numberOfPages, setNumberOfPages] = useState(1)
  
  const handlePageClick = (event) => {
    setNewItemOffset(event.selected * itemsPerPage);
  }
  
  useEffect(() => {
    // TODO: Fetching recommend manga from server
    var respond = [
      {
        "id": "Item",
        "title": "Item 1",
        "image": "https://st.ntcdntempv3.com/data/comics/189/tien-dao-so-1.jpg",
      },
      {
        "id": "Item",
        "title": "Item 2",
        "image": "https://st.ntcdntempv3.com/data/comics/41/chainsaw-man-tho-san-quy.jpg",
      },
      {
        "id": "Item",
        "title": "Item 3",
        "image": "https://st.ntcdntempv3.com/data/comics/182/truong-hoc-sieu-anh-hung.jpg",
      },
      {
        "id": "Item",
        "title": "Item 4",
        "image": "https://st.ntcdntempv3.com/data/comics/209/dao-hai-tac.jpg",
      },
      {
        "id": "Item",
        "title": "Item 5",
        "image": "https://st.ntcdntempv3.com/data/comics/235/thanh-guom-diet-quy.jpg",
      },
      {
        "id": "Item",
        "title": "Item 6",
        "image": "https://st.ntcdntempv3.com/data/comics/42/chu-thuat-hoi-chien.jpg",
      },
    ]
    respond.forEach((respond) => {
      respond.href = '/manga/' + respond.id
    })
    setRecommendedItems(respond)
  
    respond = [
      {
        "id": "Item",
        "title": "Item 4",
        "image": "https://st.ntcdntempv3.com/data/comics/209/dao-hai-tac.jpg",
      },
      {
        "id": "Item",
        "title": "Item 2",
        "image": "https://st.ntcdntempv3.com/data/comics/41/chainsaw-man-tho-san-quy.jpg",
      },
      {
        "id": "Item",
        "title": "Item 3",
        "image": "https://st.ntcdntempv3.com/data/comics/182/truong-hoc-sieu-anh-hung.jpg",
      },
      {
        "id": "Item",
        "title": "Item 1",
        "image": "https://st.ntcdntempv3.com/data/comics/189/tien-dao-so-1.jpg",
      },
      {
        "id": "Item",
        "title": "Item 6",
        "image": "https://st.ntcdntempv3.com/data/comics/42/chu-thuat-hoi-chien.jpg",
      },
      {
        "id": "Item",
        "title": "Item 5",
        "image": "https://st.ntcdntempv3.com/data/comics/235/thanh-guom-diet-quy.jpg",
      },
    ]
    respond.forEach((respond) => {
      respond.href = '/manga/' + respond.id
    })
    setHotItems(respond)

    respond = [
      {
        "id": "Item",
        "title": "Item 2",
        "image": "https://st.ntcdntempv3.com/data/comics/41/chainsaw-man-tho-san-quy.jpg",
      },
      {
        "id": "Item",
        "title": "Item 6",
        "image": "https://st.ntcdntempv3.com/data/comics/42/chu-thuat-hoi-chien.jpg",
      },
      {
        "id": "Item",
        "title": "Item 3",
        "image": "https://st.ntcdntempv3.com/data/comics/182/truong-hoc-sieu-anh-hung.jpg",
      },
      {
        "id": "Item",
        "title": "Item 4",
        "image": "https://st.ntcdntempv3.com/data/comics/209/dao-hai-tac.jpg",
      },
      {
        "id": "Item",
        "title": "Item 5",
        "image": "https://st.ntcdntempv3.com/data/comics/235/thanh-guom-diet-quy.jpg",
      },
      {
        "id": "Item",
        "title": "Item 1",
        "image": "https://st.ntcdntempv3.com/data/comics/189/tien-dao-so-1.jpg",
      },
    ]
    respond.forEach((respond) => {
      respond.href = '/manga/' + respond.id
    })
    setForUserItems(respond)

    //TODO: fetch number of items from server then calculate number of page
    setNumberOfPages(20)
  }, [])

  useEffect(() => {
    //TODO: fetch newest items from backend
    //TODO: convert unix update time to string relative time
    var respond = []
    for (var i = newItemOffset; i < newItemOffset + itemsPerPage; i++) {
      var item = {
        "id": "Item",
        "cover": "https://st.ntcdntempv3.com/data/comics/220/naruto-cuu-vi-ho-ly.jpg",
        "title": "Item " + i,
        "chapters": [
          {
            "id": "Chapter 1",
            "name": "Chapter 1",
            "updateTime": "1 ngày trước",
          },
          {
            "id": "Chapter 2",
            "name": "Chapter 2",
            "updateTime": "7 ngày trước",
          },
          {
            "id": "Chapter 3",
            "name": "Chapter 3",
            "updateTime": "14 ngày trước",
          },
        ]
      }

      respond.push(item)
    }
    respond.forEach((respond) => {
      respond.href = '/manga/' + respond.id
      respond.chapters.forEach((chapter) => {
        chapter.href = '/read/' + chapter.id
      })
    })
    setNewestItems(respond)
    pageRef.current.scrollIntoView()
  }, [newItemOffset])

  return (
    <div className='outer'>
        <div className='inner'>
          <h1>Nổi bật</h1>
            <div className='image-carousel-wrapper'>
              <ImageCarousel items={hotItems}/>
            </div>
          <h1>Đề xuất</h1>
            <div className='image-carousel-wrapper'>
              <ImageCarousel items={recommendedItems}/>
            </div>
          <h1>Gợi ý cho bạn</h1>
            <div className='image-carousel-wrapper'>
              <ImageCarousel items={forUserItems}/>
            </div>
          <h1 ref={pageRef}>Mới cập nhật</h1>
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
    </div>
  );
}
  
export default Home;