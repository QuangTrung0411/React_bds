import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "../services/AuthService";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useToast } from "../contexts/ToastContext";
import { setToast } from "../redux/slice/toastSlice";
import { useDispatch, UseDispatch } from "react-redux";
import { Button } from "../components/ui/button"
import { Loader2 } from "lucide-react"
import { useState } from "react";
import { setAuthLogin } from "../redux/slice/authSlice";


type Inputs = {
    email: string,
    password: string
};
const Login = () => {
    // const { setMessage } = useToast();
    const Navigate = useNavigate();
    const dispatch = useDispatch()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const [loading, setIsLoading] = useState<boolean>(false);
    const LoginHandler: SubmitHandler<Inputs> = async (payload) => {
        setIsLoading(true);
        try {
            const auth = await login(payload)
            dispatch(setToast({ message: 'đăng nhập thành công', type: 'success' }))
            dispatch(setAuthLogin(auth))
            // setMessage("Đăng nhập thành công", 'success'); //context
            auth && Navigate("/dashboard");
        } catch (error) {

        }
        finally {
            setIsLoading(false);
        }
    };
    //SubmitHandler<Inputs> là một kiểu dữ liệu dùng để đảm bảo rằng payload có đúng định dạng của Inputs.
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-lg font-bold mb-6 text-center">Đăng nhập</h1>
                <form onSubmit={handleSubmit(LoginHandler)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Nhập email của bạn"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 h-11"
                            {...register("email", { required: true })}
                        />
                        {errors.email && <span className="text-red-500">Bạn phải nhập email</span>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Mật khẩu:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Nhập mật khẩu của bạn"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-blue-300 h-11"
                            {...register("password", { required: true })}
                        />
                        {errors.password && <span className="text-red-500">Bạn phải nhập mật khẩu</span>}
                    </div>
                    <div className="mb-4">
                        <Button disabled={loading} className="w-full bg-blue-500 text-white hover:bg-blue-700 h-11 rounded-md">
                            {loading ? <Loader2 className="animate-spin " /> : null}
                            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                        </Button>
                    </div>


                    <p className="text-center text-gray-700"><a href="" className="text-blue-700 hover:text-blue-500">Quên mật khẩu</a></p>
                </form>
            </div>
        </div>
    )
};

export default Login;
