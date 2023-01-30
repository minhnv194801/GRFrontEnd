import { useEffect, useState } from "react";
import ImageCarousel from "../components/carousel/ImageCarousel";
import './Home.css'

function Home() {
  var [recommendedItems, setRecommendedItems] = useState([{
    "title": "",
    "image": "",
    "href": "",
  }])

  var [hotItems, setHotItems] = useState([{
    "title": "",
    "image": "",
    "href": "",
  }])
  
  useEffect(() => {
    // TODO: Fetching recommend manga from server
    var respond = [
      {
        "title": "Item 1",
        "image": "https://st.ntcdntempv3.com/data/comics/189/tien-dao-so-1.jpg",
        "href": "https://st.ntcdntempv3.com/data/comics/189/tien-dao-so-1.jpg",
      },
      {
        "title": "Item 2",
        "image": "https://st.ntcdntempv3.com/data/comics/41/chainsaw-man-tho-san-quy.jpg",
        "href": "https://st.ntcdntempv3.com/data/comics/41/chainsaw-man-tho-san-quy.jpg",
      },
      {
        "title": "Item 3",
        "image": "https://st.ntcdntempv3.com/data/comics/182/truong-hoc-sieu-anh-hung.jpg",
        "href": "https://st.ntcdntempv3.com/data/comics/182/truong-hoc-sieu-anh-hung.jpg",
      },
      {
        "title": "Item 4",
        "image": "https://st.ntcdntempv3.com/data/comics/209/dao-hai-tac.jpg",
        "href": "https://st.ntcdntempv3.com/data/comics/209/dao-hai-tac.jpg",
      },
      {
        "title": "Item 5",
        "image": "https://st.ntcdntempv3.com/data/comics/235/thanh-guom-diet-quy.jpg",
        "href": "https://st.ntcdntempv3.com/data/comics/235/thanh-guom-diet-quy.jpg",
      },
      {
        "title": "Item 6",
        "image": "https://st.ntcdntempv3.com/data/comics/42/chu-thuat-hoi-chien.jpg",
        "href": "https://st.ntcdntempv3.com/data/comics/42/chu-thuat-hoi-chien.jpg",
      },
    ]
    setRecommendedItems(respond)
  
    var respond = [
      {
        "title": "Item 4",
        "image": "https://st.ntcdntempv3.com/data/comics/209/dao-hai-tac.jpg",
        "href": "https://st.ntcdntempv3.com/data/comics/209/dao-hai-tac.jpg",
      },
      {
        "title": "Item 2",
        "image": "https://st.ntcdntempv3.com/data/comics/41/chainsaw-man-tho-san-quy.jpg",
        "href": "https://st.ntcdntempv3.com/data/comics/41/chainsaw-man-tho-san-quy.jpg",
      },
      {
        "title": "Item 3",
        "image": "https://st.ntcdntempv3.com/data/comics/182/truong-hoc-sieu-anh-hung.jpg",
        "href": "https://st.ntcdntempv3.com/data/comics/182/truong-hoc-sieu-anh-hung.jpg",
      },
      {
        "title": "Item 1",
        "image": "https://st.ntcdntempv3.com/data/comics/189/tien-dao-so-1.jpg",
        "href": "https://st.ntcdntempv3.com/data/comics/189/tien-dao-so-1.jpg",
      },
      {
        "title": "Item 6",
        "image": "https://st.ntcdntempv3.com/data/comics/42/chu-thuat-hoi-chien.jpg",
        "href": "https://st.ntcdntempv3.com/data/comics/42/chu-thuat-hoi-chien.jpg",
      },
      {
        "title": "Item 5",
        "image": "https://st.ntcdntempv3.com/data/comics/235/thanh-guom-diet-quy.jpg",
        "href": "https://st.ntcdntempv3.com/data/comics/235/thanh-guom-diet-quy.jpg",
      },
    ]
    setHotItems(respond)
  }, [])

  //TODO: css for the header (h1)
  return (
    <div className='outer'>
        <div className='inner'>
          <h1>Đề xuất</h1>
          <ImageCarousel items={recommendedItems}/>
          <h1>Nổi bật</h1>
          <ImageCarousel items={hotItems}/>
          <h1>Gợi ý cho bạn</h1>
          <ImageCarousel items={hotItems}/>
          <h1>Mới cập nhật</h1>

        </div>
    </div>
  );
}
  
export default Home;
  