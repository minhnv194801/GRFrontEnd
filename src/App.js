import { RouterProvider , createBrowserRouter} from 'react-router-dom';
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
import { useEffect } from 'react';
import { login, logout } from './AppSlice';
import { displayFailure } from './components/topalert/TopAlertSlice';
import refreshTokenIfNeeded from './common/JWT';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/manga/:id",
    element: <Manga />,
  },
  {
    path: "/read/:id",
    element: <Read />,
  },
  {
    path: "/user",
    element: <User page='info'/>,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "*",
    element: <Home />,
  }
]);

function App() {
  const dispatch = useDispatch()
  const sessionkey = useSelector((state) => state.app.sessionkey)
  const refreshkey = useSelector((state) => state.app.refreshkey)

  useEffect(() => {
    const refresh = async() => {
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
        <Navbar />
        <TopAlert />
        <RouterProvider router={router} />
        <Footer />
    </div>
  );
}

export default App;
