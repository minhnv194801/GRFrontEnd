import React from 'react';
import AdminNavbar from './navbar/AdminNavbar'
import './Admin.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import refreshTokenIfNeeded from '../../common/JWT';
import { login, logout } from '../../AppSlice';
import { useNavigate } from 'react-router-dom';
import { displayFailure } from '../../components/topalert/TopAlertSlice';

const Admin = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const sessionkey = useSelector((state) => state.app.sessionkey)
    const refreshkey = useSelector((state) => state.app.refreshkey)

    useEffect(() => {
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

        refresh()
    }, [])

    return (
        // <Admin basename='/admin' dataProvider={dataProvider}>
        //     <Resource name="users" list={UserList} create={UserCreate} show={UserShow} edit={UserEdit} />
        //     <Resource name="mangas" list={MangaList} create={MangaCreate} show={MangaShow} edit={EditGuesser} />
        //     <Resource name="chapters" list={ChapterList} create={ChapterCreate} show={ChapterShow} edit={EditGuesser} />
        //     <Resource name="comments" list={CommentList} show={CommentShow} edit={EditGuesser} />
        //     <Resource name="reports" list={ReportList} show={ReportShow} edit={EditGuesser} />
        // </Admin>
        <div>
            <AdminNavbar selected={props.selected} />
            <div className='admin-outer'>
                {props.children}
            </div>
        </div>
    )
}

export default Admin