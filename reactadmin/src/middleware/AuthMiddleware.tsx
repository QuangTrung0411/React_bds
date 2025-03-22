import { log } from "console";
import { PropsWithChildren } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchUser } from "../services/AuthService";
import { setAuthLogin, setAuthLogout } from "../redux/slice/authSlice";


type protectedRouteProps = PropsWithChildren

const AuthMiddleware = ({ children }: protectedRouteProps) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        const checkAuthenticate = async () => {
            if (!isAuthenticated || user === null) {
                const userData = await fetchUser();// Gọi API để kiểm tra token
                if (userData) {
                    dispatch(setAuthLogin(userData));
                } else {
                    dispatch(setAuthLogout());
                    navigate("/admin");// Điều hướng về trang login nếu không xác thực
                }
            }
        }
        checkAuthenticate();
    }, [isAuthenticated, user, navigate, dispatch]);

    return isAuthenticated && user ? children : null;

}

export default AuthMiddleware;
