import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Home from './pages/Home';
import Read from './pages/Read'
import Manga from './pages/Manga'
import User from './pages/User'
import Search from './pages/Search'
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/manga",
    element: <Manga/>,
  },
  {
    path: "/read",
    element: <Read/>,
  },
  {
    path: "/user",
    element: <User/>,
  },
  {
    path: "/search",
    element: <Search/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='page-wrapper'>
      <Navbar/>
      <RouterProvider router={router}/>
      <Footer/>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
