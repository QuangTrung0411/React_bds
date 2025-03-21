import axiosInstance from "../configs/axios";
import handleAxiosError from "../helpers/axiosHelper";
import { UseSelector, useDispatch} from "react-redux";
import type {Dispatch} from "@reduxjs/toolkit";
import { setAuthLogin } from "../redux/slice/authSlice";
import { User } from "../types/User";

type LoginPayload = {
    email: string,
    password: string
}


//payload: LoginPayload: Định nghĩa kiểu dữ liệu của tham số truyền vào hàm login
const login = async (payload: LoginPayload) => {
    try {
        // const dispatch: Dispatch = useDispatch();
        const response = await axiosInstance.post('/auth/login', {
            email: payload.email,
            password: payload.password
        })

        const user = response.data.user;
        // console.log(user);

        // dispatch(setAuthLogin(user))
        return response.data.user;
    } catch (error) {
        handleAxiosError(error);
        return null;
    }
}
const fetchUser = async (): Promise<User | null> => {

    try {
        const response = await axiosInstance.get('/auth/me');
        return response.data.user;
    } catch (error) {
        handleAxiosError(error);
        return null;
    }

 return null
}

export { login, fetchUser }