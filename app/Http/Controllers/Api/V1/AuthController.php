<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\AuthRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Cookie;
use App\Http\Resources\UserResouce;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Exception;
use App\Models\User;



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

        $refreshTokenData = $this->refreshTokenData($user);

        $refresh_token = JWTAuth::getJWTProvider()->encode($refreshTokenData);

        $cookie = $this->setTokenAndRefreshTokenCookie($token, $refresh_token);
        $tokenCookie = $cookie['tokenCookie'];
        $refreshCookie = $cookie['refreshTokenCookie'];

        return $this->respondWithToken($token, $refresh_token, $user)->withCookie($tokenCookie)->withCookie($refreshCookie);
    }

    public function refresh(Request $request)
    {
        try {
            if ($request->hasCookie('access_token')) {
                $token = $request->cookie('access_token');
                $request->headers->set('Authorization', 'Bearer ' . $token); //thêm token vào header request
            }
            $user = JWTAuth::parseToken()->authenticate(); //lấy user hiện tại

            $token = JWTAuth::parseToken()->refresh(); //tạo token mới
            if (JWTAuth::getToken()) {
                JWTAuth::invalidate(JWTAuth::getToken()); // This will blacklist the old token if blacklist is enabled
            }
            $refreshTokenData = $this->refreshTokenData($user);
            JWTAuth::invalidate(JWTAuth::getToken()); // Vô hiệu hóa token cũ để đảm bảo không sử dụng lại
            $refreshToken = JWTAuth::getJWTProvider()->encode($refreshTokenData);
            $cookie = $this->setTokenAndRefreshTokenCookie($token, $refreshToken);
            $tokenCookie = $cookie['tokenCookie'];
            $refreshCookie = $cookie['refreshTokenCookie'];
            return $this->respondWithToken($token, $refreshToken, $user)->withCookie($tokenCookie)->withCookie($refreshCookie);
        } catch (TokenExpiredException $e) {

            if ($request->hasCookie('refresh_token')) {

                if (!$request->cookie('refresh_token')) {
                    return response()->json(['message' => 'Token không tìm thấy'],  Response::HTTP_UNAUTHORIZED);
                }

                $refreshTokenCookie = $request->cookie('refresh_token');
                $refreshTokenDecode = JWTAuth::getJWTProvider()->decode($refreshTokenCookie);

                $user = User::find($refreshTokenDecode['user_id']);
                $token = auth('api')->login($user);
                $refreshTokenData = $this->refreshTokenData($user);
                $refreshToken = JWTAuth::getJWTProvider()->encode($refreshTokenData);

                $cookie = $this->setTokenAndRefreshTokenCookie($token, $refreshToken);
                $tokenCookie = $cookie['tokenCookie'];
                $refreshCookie = $cookie['refreshTokenCookie'];
                return $this->respondWithToken($token, $refreshToken, $user)->withCookie($tokenCookie)->withCookie($refreshCookie);
            }

            return response()->json(['message' => 'Token đã hết hạn'],  Response::HTTP_UNAUTHORIZED);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Token không hợp lệ'],  Response::HTTP_UNAUTHORIZED);
        } catch (Exception $e) {
            return response()->json(['message' => 'Token không tìm thấy'],  Response::HTTP_UNAUTHORIZED);
        }
    }

    protected function respondWithToken($token, $refresh_token, $user)
    {
        return response()->json([
            'access_token' => $token,
            'refresh_token' => $refresh_token,
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

    private function setTokenAndRefreshTokenCookie($token, $refreshToken,)
    {
        $cookie = Cookie::make(
            'access_token',
            $token,
            config('jwt.ttl') * 24, //1 ngày
            '/',
            null,
            true,
            true,
            false,
            'None'
        );

        $refreshTokenCookie = Cookie::make(
            'refresh_token',
            $refreshToken,
            config('jwt.ttl') * 60 * 24 * 14, //2 tuần
            '/',
            null,
            true,
            true,
            false,
            'None'
        );
        return [
            'tokenCookie' => $cookie,
            'refreshTokenCookie' => $refreshTokenCookie
        ];
    }


    private function refreshTokenData($user)
    {
        return [
            'user_id' => $user->id, //id của user
            'expires_in' => time() + 1, //thời gian hết hạn của refreshtoken
            'random' => time() . md5(rand())
        ];
    }

    //     private function refreshToken($token,$refreshToken) {
    //         $refreshTokenData = $this->refreshTokenData($user);
    //         $refreshToken = JWTAuth::getJWTProvider()->encode($refreshTokenData);

    //         $cookie = $this->setTokenAndRefreshTokenCookie($token, $refreshToken);
    //         $tokenCookie = $cookie['tokenCookie'];
    //         $refreshCookie = $cookie['refreshTokenCookie'];
    // }
}
