import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home';
import Read from './pages/read/Read'
import Manga from './pages/manga/Manga'
import User from './pages/user/User'
import Search from './pages/search/Search'
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import store from './store/store';
import { Provider } from "react-redux";
import TopAlert from './components/topalert/TopAlert';
import App from './App';

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
