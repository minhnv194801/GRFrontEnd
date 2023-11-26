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

        const checkAuth = async () => {
            const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/admin/auth', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Authorization': sessionkey,
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
                window.location.href = '/'
            }
        }

        const interval = setInterval(() => {
            refresh()
            console.log('fresh')
        }, 300000);

        checkAuth()

        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <AdminNavbar selected={props.selected} />
            <div className='admin-outer'>
                {props.children}
            </div>
        </div>
    )
}

export default Admin