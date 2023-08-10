<?php

namespace App\Http\Controllers\Api;

use App\Models\Users;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    public function index(){
        $users = Users::all();
        if ($users->count() > 0){
            return response()->json([
                'status' => 200,
                'users' => $users,
            ], 200);
        }
        return response()->json([
            'status' => 404,
            'message' => 'Users not found',
        ],404);
        
    }

    public function store(Request $req){
        $validator = Validator::make($req->all(), [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255',
            'password' => 'required|max:255',
        ]);

        if($validator -> fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        }

        $users = Users::create([
            'name' => $req->name,
            'email' => $req->email,
            'password' => $req->password,
        ]);

        if($users){
            return response()->json([
                'status' => 200,
                'message' => 'Users created successfully',
            ], 200);
        }
        return response()->json([
            'status' => 404,
            'message' => 'Users not found',
        ],404);
    }

}
