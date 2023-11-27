import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Star, Circle } from '@mui/icons-material';
import { displayFailure } from '../../../components/topalert/TopAlertSlice';
import './RecommendItemList.css'

function RecommendItemList() {
    const sessionkey = useSelector((state) => state.app.sessionkey)
    const [visibility, setVisibility] = useState(false)
    const [itemList, setItemList] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchRecommendItems = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/home/user/recommend/5/', {
                    method: 'GET',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': sessionkey,
                    },
                });
                if (response.ok) {
                    // convert data to json
                    const json = await response.json();

                    setItemList(json)
                    setVisibility(true)
                } else {
                    dispatch(displayFailure({
                        "title": "Lỗi hệ thống",
                        "content": "Gặp lỗi hệ thống khi tải thông tin người dùng, xin vui lòng thử tải lại trang",
                    }))
                }
            } catch (error) {
                dispatch(displayFailure({
                    "title": "Lỗi kết nối",
                    "content": "Kết nối với server thất bại",
                }))
            }
        }

        fetchRecommendItems()
        // eslint-disable-next-line
    }, [])

    const handleCloseList = (e) => {
        setVisibility(false)
    }

    const handleChildClick = (e) => {
        e.stopPropagation()
    }

    const navigateToMangaPage = (id) => {
        window.location.href = "/manga/" + id;
    }

    return (
        <div className={visibility ? "recommendation-list-wrapper" : "hidden-recommendation-list-wrapper"} onClick={handleCloseList}>
            <div className="recommendation-list" onClick={handleChildClick}>
                <h1 className="recommendation-list-header">Gợi ý cho bạn</h1>
                {itemList.map((item) =>
                    <div className='recommendation-item-wrapper' onMouseDown={(e) => navigateToMangaPage(item.id)}>
                        <div className='recommendation-item-cover-wrapper'>
                            <img className='recommendation-item-cover' src={item.cover} alt='RecommendationItemCover'/>
                        </div>
                        <div className='recommendation-item-content-wrapper'>
                            <h2 className='recommendation-item-title'>{item.title}</h2>
                            <div className='recommendation-item-info-wrapper'>
                                <div className='recommendation-item-rating-status-wrapper'>
                                    <div className='recommendation-item-rating-wrapper'>
                                        <Star sx={{ color: 'yellow' }} fontSize='small' />
                                        {item.rating === 0 ? 'N/a' : Number(item.rating).toFixed(2)}
                                    </div>
                                    <div className='recommendation-item-status-wrapper'>
                                        <Circle sx={{ color: item.status === 0 ? '#00FF00' : '#87CEEB' }} fontSize='small' />
                                        {item.status === 0 ? "Đang tiến hành" : "Đã hoàn thành"}
                                    </div>
                                </div>
                                <div>
                                    <div className="recommendation-item-tag-list-wrapper">
                                        {item.tags === undefined ? null : item.tags.map((tag) => <div className="recommendation-item-tag-wrapper">{tag}</div>)}
                                    </div>
                                </div>
                                <div className='recommendation-item-description-wrapper'>{item.description}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecommendItemList;