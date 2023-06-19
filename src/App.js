import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import TopAlert from './components/topalert/TopAlert';
import Home from './pages/home/Home';
import Read from './pages/read/Read'
import Manga from './pages/manga/Manga'
import User from './pages/user/User'
import Search from './pages/search/Search'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { useSidebarState, Resource, List, Datagrid, TextField, EmailField, useRecordContext, ReferenceArrayField, EditButton, Layout, Menu, RefreshIconButton, TitlePortal, Button, Title } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { useEffect } from 'react';
import { login, logout } from './AppSlice';
import { displayFailure } from './components/topalert/TopAlertSlice';
import refreshTokenIfNeeded from './common/JWT';
import { AppBar, Box, Toolbar } from '@mui/material';
import Admin from './pages/admin/Admin';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><Navbar /><Home /><Footer /></div>,
  },
  {
    path: "/manga/:id",
    element: <div><Navbar /><Manga /><Footer /></div>,
  },
  {
    path: "/read/:id",
    element: <div><Navbar /><Read /><Footer /></div>,
  },
  {
    path: "/user",
    element: <div><Navbar /><User page='info' /><Footer /></div>,
  },
  {
    path: "/user/favorite",
    element: <div><Navbar /><User page='favorite' /><Footer /></div>,
  },
  {
    path: "/user/owned",
    element: <div><Navbar /><User page='owned' /><Footer /></div>,
  },
  {
    path: "/user/report",
    element: <div><Navbar /><User page='report' /><Footer /></div>,
  },
  {
    path: "/search",
    element: <div><Navbar /><Search /><Footer /></div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin/*",
    element: <Admin />,
  },
  {
    path: "*",
    element: <div><Navbar /><Home /><Footer /></div>,
  }
]);

function App() {
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
          dispatch(displayFailure({
            "title": "Đăng xuất",
            "content": "Phiên đăng nhập của bạn đã hết hạn. Xin hãy đăng nhập lại",
          }))
        }
      }
    }
    refresh()
  }, [])

  return (
    <div className='page-wrapper'>
      <TopAlert />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
