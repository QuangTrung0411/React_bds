import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
    email: string,
    password: string
};
const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const Login: SubmitHandler<Inputs> = () => {
        console.log(123);
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-lg font-bold mb-6 text-center">Đăng nhập</h1>
                <form onSubmit={handleSubmit(Login)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input
                            type="text"
                            id="email"
                            placeholder=""
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus-blue-200 h-11"
                            {...register("email", { required: true })}
                        />
                        {errors.email && <span className="text-red-500">Bạn phải nhập email</span>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Mật khẩu:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder=""
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus-blue-200 h-11"
                            {...register("password", { required: true })}
                        />
                        {errors.password && <span className="text-red-500">Bạn phải nhập mật khẩu</span>}
                    </div>
                    <div className="mb-4">
                        <button type="submit"
                            className="w-full bg-blue-500 text-white hover:bg-blue-700 h-11 rounded-md">Đăng nhập</button>
                    </div>
                    <p className="text-center text-gray-700"><a href="" className="text-blue-700 hover:text-blue-500">Quên mật khẩu</a></p>
                </form>
            </div>
        </div>
    )
};

export default Login;
