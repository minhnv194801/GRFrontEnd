import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
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
import { useEffect } from 'react';
import { login, logout } from './AppSlice';
import { displayFailure } from './components/topalert/TopAlertSlice';
import refreshTokenIfNeeded from './common/JWT';
import Admin from './pages/admin/Admin';
import MainAdmin from './pages/admin/mainpage/MainAdmin';
import './App.css';

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
    path: "/admin",
    element: <Admin adminContent={<MainAdmin />}/>,
  },
  {
    path: "/admin/manga",
    element: <Admin adminContent={<></>} selected='manga'/>,
  },
  {
    path: "/admin/chapter",
    element: <Admin adminContent={<></>} selected='chapter'/>,
  },
  {
    path: "/admin/user",
    element: <Admin adminContent={<></>} selected='user'/>,
  },
  {
    path: "/admin/comment",
    element: <Admin adminContent={<></>} selected='comment'/>,
  },
  {
    path: "/admin/report",
    element: <Admin adminContent={<></>} selected='report'/>,
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
