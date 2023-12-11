import { Button, Grid } from "@mui/material"
import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import { displayFailure, displaySuccess } from '../../../components/topalert/TopAlertSlice'
import { login, logout } from "../../../AppSlice";
import refreshTokenIfNeeded from "../../../common/JWT";
import { useNavigate } from "react-router-dom"
import './MangaChapter.css'

const MangaChapter = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sessionkey = useSelector((state) => state.app.sessionkey)
    const refreshkey = useSelector((state) => state.app.refreshkey)
    const isLogin = useSelector((state) => state.app.isLogin)

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

    const handleReadChapter = (e) => {
        navigate('/read/' + e.target.value)
    }

    const handlePurchaseChapter = (e) => {
        const postPaymentRequest = async () => {
            let newSessionkey = await refresh()
            try {
                const response = await fetch(process.env.REACT_APP_API_ENDPOINT + '/pay/momo/payurl/' + props.chapter.id, {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': newSessionkey ? newSessionkey : sessionkey,
                    },
                    body: JSON.stringify({
                        'redirectUrl': window.location.protocol + '//' + window.location.hostname + '/read/' + props.chapter.id,
                    })
                });

                if (response.ok) {
                    var json = await response.json()
                    window.location.href = json.payUrl
                } else {
                    var json = await response.json()
                    dispatch(displayFailure({
                        "title": "Thất bại",
                        "content": json.message,
                    }))
                }
            } catch (error) {
                dispatch(displayFailure({
                    "title": "Lỗi kết nối",
                    "content": "Kết nối với server thất bại",
                }))
            }
        }

        if (!isLogin) {
            dispatch(displayFailure({
                "title": "Thất bại",
                "content": "Hãy đăng nhập để có thể mua truyện",
            }))
        } else {
            postPaymentRequest()
        }
    }

    return (
        <div className='single-chapter-wrapper'>
            <Grid container spacing={1} justify="flex-end" alignItems="center">
                <Grid sx={{ textAlign: "center" }} item xs={4} md={3}>
                    <img className='chapter-cover' src={props.chapter.cover} alt="Bìa chương truyện" />
                </Grid>
                <Grid item xs={8} md={9}>
                    <div className='chapter-info-wrapper'>
                        <h3 className='manga-chapter-title'>
                            {props.chapter.title}
                        </h3>
                        <p className='chapter-updatetime'>
                            {"(Cập nhật: " + props.chapter.updateTime + ")"}
                        </p>
                        {
                            (!props.chapter.isOwned) ?
                                <div>
                                    <h6>
                                        {props.chapter.price + " VND"}
                                    </h6>
                                    <Button sx={{ borderRadius: '25px', backgroundColor: "#4169E1", "&:hover": { backgroundColor: "#4E76ED" } }} onClick={handlePurchaseChapter} variant="contained">Mua</Button>
                                </div>
                                :
                                <div>
                                    <Button sx={{ borderRadius: '25px', backgroundColor: "#ED2939", "&:hover": { backgroundColor: "#C00000" } }} value={props.chapter.id} onClick={handleReadChapter} variant="contained">Đọc</Button>
                                </div>
                        }
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default MangaChapter