import axiosInstance from "../configs/axios";
import handleAxiosError from "../helpers/axiosHelper";

type LoginPayload = {
    email: string,
    password: string
}


//payload: LoginPayload: Định nghĩa kiểu dữ liệu của tham số truyền vào hàm login
const login = async (payload: LoginPayload): Promise<boolean> => {
    try {
        await axiosInstance.post('/auth/login', {
            email: payload.email,
            password: payload.password
        })
        return true;
    } catch (error) {
        handleAxiosError(error);
        return false;
    }
}

export { login }