<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\UserResouce;
use App\Models\User;



class UserController extends Controller
{

    public function __construct(){}

    public function index () {
        return response()->json([
            'user'=> User::all(),
        ]);
    }
   
}
