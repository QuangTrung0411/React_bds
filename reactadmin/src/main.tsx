import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import { ToastProvider } from './contexts/ToastContext';
const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  }
]);

createRoot(document.getElementById('root')!).render(
<ToastProvider>
        <RouterProvider router={router} />
        <ToastContainer />
</ToastProvider>
)
