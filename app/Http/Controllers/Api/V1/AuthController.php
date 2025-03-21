<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\AuthRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Cookie;
use App\Http\Resources\UserResouce;

class AuthController extends Controller
{

    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => ['login']]);

    }

    //Nhận request đã được validate qua AuthRequest
    public function login(AuthRequest $request)
    {
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ];


        //check dữ liệu đăng nhập auth('api')->attempt($credentials),tạo jwt token
        if (! $token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Tài khoản hoặc mật khẩu không chính xác'], Response::HTTP_UNAUTHORIZED);
        }


        $user = auth('api')->user();
        $cookie = Cookie::make(
            'access_token',
            $token,
            config('jwt.ttl') * 60 * 24,
            '/',
            null,
            true,
            true,
            false,
            'None'
        );
        return $this->respondWithToken($token, $user)->withCookie($cookie);
    }

    protected function respondWithToken($token, $user)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 1,
            'user' => new UserResouce($user)
        ]);
    }

    //Lấy thông tin User hiện tại
    public function me()
    {
        return response()->json([
           'user' => new UserResouce(auth('api')->user())
        ]);
    }
}
