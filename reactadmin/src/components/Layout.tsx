import React from "react";
import { Outlet } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { showNotify } from "../helpers/myHelper";
import { RootState } from "../redux/store";
import { clearToast } from "../redux/slice/toastSlice";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { showToast } from "../helpers/myHelper";
import Header from "./Header";
import Aside from "./Aside";
import '../assets/scss/Style.scss'



const Layout: React.FC = () => {
    // const { message,type, setMessage } = useToast();
    const { message, type } = useSelector((state: RootState) => state.toast);
    const dispatch = useDispatch()

    useEffect(() => {

        showToast(message, type);
        dispatch(clearToast())
    }, [message, type]);



    return (

            <div className="page">

                <Header/>
                <Aside />
                <div className="main-content">
                    <Outlet />
                </div>

            </div>

    )
}

export default Layout;
