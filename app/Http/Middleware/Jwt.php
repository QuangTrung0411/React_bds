<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Exception;

class Jwt
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        try {
            if ($request->hasCookie('access_token')) {
                $token = $request->cookie('access_token');
                $request->headers->set('Authorization', 'Bearer ' . $token);
            }

            if (!$token) {
                return response()->json(['message' => 'Token không hợp lệ hoặc hết hạn'], 401);
            }

            $user = auth('api')->user();

            if (!$user) {
                return response()->json(['message' => 'user không tồn tại'], 401);
            }
        } catch (TokenExpiredException $e) {
            return response()->json(['message' => 'Token đã hết hạn'], 401);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Token không hợp lệ'], 401);
        } catch (Exception $e) {
            return response()->json(['message' => 'Token không tìm thấy'], 401);
        }

        return $next($request);
    }
}
