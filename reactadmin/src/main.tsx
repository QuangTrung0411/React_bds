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
import { ToastProvider } from './contexts/ToastContext';
import store from './redux/store'
import User from './pages/user/User';
import { Provider } from 'react-redux';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/user",
        element: <User />,
      },
    ]
  },

]);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ToastProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </ToastProvider>
  </Provider>
)
