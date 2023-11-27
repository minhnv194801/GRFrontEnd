import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Owned.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import refreshTokenIfNeeded from '../../../common/JWT';
import { login, logout } from '../../../AppSlice';
import { displayFailure } from '../../../components/topalert/TopAlertSlice';

function Owned() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ownedMangaList, setOwnedMangaList] = useState([])
    const [selectedChapterId, setSelectedChapterId] = useState("")
    const sessionkey = useSelector((state) => state.app.sessionkey)
    const refreshkey = useSelector((state) => state.app.refreshkey)

    const refresh = async () => {
        var res = await refreshTokenIfNeeded(sessionkey, refreshkey)
        if (res.isRefresh) {
            if (res.sessionkey) {
                dispatch(login(res))
            } else {
                dispatch(logout())
                navigate('/')
                dispatch(displayFailure({
                    "title": "Đăng xuất",
                    "content": "Phiên đăng nhập của bạn đã hết hạn. Xin hãy đăng nhập lại",
                }))
            }
        }
        return res.sessionkey
    }

    const handleSelectChapter = (e) => {
        switch (e.detail) {
            case 1:
                setSelectedChapterId(e.target.id)
                break;
            case 2:
                navigate("/read/" + e.target.id)
                break;
            default:
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let newSessionkey = await refresh()
                const response = await fetch(process.env.API_ENDPOINT+'/user/owned', {
                    method: 'GET',
                    credentials: 'same-origin',
                    headers: {
                        'Authorization': newSessionkey ? newSessionkey : sessionkey,
                        'Content-Type': 'application/json'
                    }
                })
                if (response.ok) {
                    // convert data to json
                    const json = await response.json();

                    if (json === null || json.length === 0) {
                        setOwnedMangaList([])
                    } else {
                        setOwnedMangaList(json)
                    }
                } else {
                    if (response.status === 401) {
                        navigate("/")
                        dispatch(displayFailure({
                            "title": "Unauthorized",
                            "content": "Vui lòng đăng nhập lại",
                        }))
                    } else {
                        dispatch(displayFailure({
                            "title": "Lỗi hệ thống",
                            "content": "Gặp lỗi hệ thống khi tải danh sách chương truyện sở hữu, xin vui lòng thử tải lại trang",
                        }))
                    }
                }
            } catch (error) {
                dispatch(displayFailure({
                    "title": "Lỗi kết nối",
                    "content": "Kết nối với server thất bại",
                }))
            }
        }

        fetchData()
        // eslint-disable-next-line
    }, [])

    return (
        <InfiniteScroll
            dataLength={1}
            height={660}
        >
            {ownedMangaList.length !== 0 ?
                ownedMangaList.map((owned) =>
                    <div className='owned-list-wrapper'>
                        <Grid container sx={{ marginTop: '30px' }}>
                            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                                <a href={'/manga/' + owned.id}>
                                    <img className='owned-manga-cover' src={owned.cover} alt='owned-cover' />
                                </a>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <div className='owned-chapter-title-wrapper'>
                                    <a className='owned-title-href' href={'/manga/' + owned.id}>
                                        <h3 className='owned-chapter-title'>{owned.title}</h3>
                                    </a>
                                    <div></div>
                                </div>
                                <h3>Danh sách chương sở hữu:</h3>
                                <div className='scroll-wrapper'>
                                    <InfiniteScroll
                                        dataLength={3}
                                        height={200}
                                    >
                                        {owned.chapters.map((chapter) =>
                                            <div className={selectedChapterId === chapter.id ? 'selected-owned-chapter-wrapper' : 'owned-chapter-wrapper'} id={chapter.id} onClick={handleSelectChapter}>
                                                {chapter.title}
                                            </div>
                                        )}
                                    </InfiniteScroll>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                )
                :
                <div><h3 className='emptyHeader'>Hiện bạn chưa sở hữu chương truyện nào</h3></div>}
        </InfiniteScroll>
    )
}

export default Owned