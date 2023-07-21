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
import MangaAdminList from './pages/admin/list/mangalist/MangaAdminList';
import ChapterAdminList from './pages/admin/list/chapterlist/ChapterAdminList';
import UserAdminList from './pages/admin/list/userlist/UserAdminList';
import CommentAdminList from './pages/admin/list/commentlist/CommentAdminLIst';
import ReportAdminList from './pages/admin/list/reportlist/ReportAdminList';
import MangaAdminShow from './pages/admin/show/mangashow/MangaAdminShow';
import ReportAdminShow from './pages/admin/show/reportshow/ReportAdminShow';
import CommentAdminShow from './pages/admin/show/commentshow/CommentAdminShow';
import ChapterAdminShow from './pages/admin/show/chaptershow/ChapterAdminShow';
import UserAdminShow from './pages/admin/show/usershow/UserAdminShow';
import UserAdminCreate from './pages/admin/create/usercreate/UserAdminCreate';
import ChapterAdminCreate from './pages/admin/create/chaptercreate/ChapterAdminCreate';
import MangaAdminCreate from './pages/admin/create/mangacreate/MangaAdminCreate';

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
    element: <Admin > <MainAdmin /> </Admin>,
  },
  {
    path: "/admin/manga",
    element: <Admin selected='manga'> <MangaAdminList /> </Admin>,
  },
  {
    path: "/admin/chapter",
    element: <Admin selected='chapter'> <ChapterAdminList /> </Admin>,
  },
  {
    path: "/admin/user",
    element: <Admin selected='user'> <UserAdminList /> </Admin>,
  },
  {
    path: "/admin/comment",
    element: <Admin selected='comment'> <CommentAdminList /> </Admin>,
  },
  {
    path: "/admin/report",
    element: <Admin selected='report'> <ReportAdminList /> </Admin>,
  },
  {
    path: "/admin/manga/show/:id",
    element: <Admin selected='manga'> <MangaAdminShow /> </Admin>,
  },
  {
    path: "/admin/chapter/show/:id",
    element: <Admin selected='chapter'> <ChapterAdminShow /> </Admin>,
  },
  {
    path: "/admin/user/show/:id",
    element: <Admin selected='user'> <UserAdminShow /> </Admin>,
  },
  {
    path: "/admin/comment/show/:id",
    element: <Admin selected='comment'> <CommentAdminShow /> </Admin>,
  },
  {
    path: "/admin/report/show/:id",
    element: <Admin selected='report'> <ReportAdminShow /> </Admin>,
  },
  {
    path: "/admin/user/create",
    element: <Admin selected='user'> <UserAdminCreate /> </Admin>,
  },
  {
    path: "/admin/chapter/create",
    element: <Admin selected='chapter'> <ChapterAdminCreate /> </Admin>,
  },
  {
    path: "/admin/manga/create",
    element: <Admin selected='manga'> <MangaAdminCreate /> </Admin>,
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
