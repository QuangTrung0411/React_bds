import { log } from "console";
import { PropsWithChildren } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


type protectedRouteProps = PropsWithChildren

const AuthMiddleware = ({ children }: protectedRouteProps) => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        console.log(isAuthenticated, user);
    }, [isAuthenticated, user]);
    return children;
}


export default AuthMiddleware;
