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
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ToastContainer />
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>
)
