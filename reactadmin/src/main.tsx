import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import store from './redux/store'
import User from './pages/user/user/View';
import { Provider } from 'react-redux';
import Layout from './components/Layout';
import AuthMiddleware from './middleware/AuthMiddleware';
import NoAuthMiddleware from './middleware/NoAuthMiddleware';
const router = createBrowserRouter([
  {
    path: "/admin",
    element:
      <NoAuthMiddleware>
        <Login />
      </NoAuthMiddleware>
    ,
  },
  {
    path: "/",
    element: <AuthMiddleware><Layout /></AuthMiddleware>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/order",
        element: <Dashboard />,
      },
      {
        path: "/user/index",
        element: <User/>,
      },
    ]
  },

]);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>
)
