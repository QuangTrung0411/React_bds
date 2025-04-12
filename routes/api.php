<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Middleware\Jwt;
use App\Http\Controllers\Api\V1\UserController;


Route::post('v1/auth/login', [AuthController::class, 'login']);
Route::post('v1/auth/refresh', [AuthController::class, 'refresh']);

Route::group([
    'middleware' => [Jwt::class],  // Thay 'Jwt' thành [Jwt::class]
    'prefix' => 'v1/auth'
], function ($router) {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);
});


Route::group([
    'middleware' => [Jwt::class],  // Thay 'Jwt' thành [Jwt::class]
    'prefix' => 'v1'
], function ($router) {
    // user
    Route::get('users', [UserController::class, 'index']);
});
