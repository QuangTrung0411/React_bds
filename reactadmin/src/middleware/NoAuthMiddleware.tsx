
import { PropsWithChildren, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchUser } from "../services/AuthService";



type protectedRouteProps = PropsWithChildren

const NoAuthMiddleware = ({ children }: protectedRouteProps) => {


    const navigate = useNavigate();

    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
    const [checkedAuth, setCheckedAuth ]  = useState<boolean>(false);

    useEffect(() => {
        const checkAuthenticate = async () => {

            try {
                const userData = await fetchUser();
                if (userData !== null) {
                    navigate("/dashboard");

                } else {
                    setCheckedAuth(true);
                }
            } catch (error) {
                setCheckedAuth(true);
            }
        }
        if (!isAuthenticated || user !== null) {
            checkAuthenticate();
        } else {
            navigate("/dashboard");
        }
    }, [isAuthenticated, user]);


    return checkedAuth ? children : null;
}


export default NoAuthMiddleware;
