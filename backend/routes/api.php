<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);
    Route::apiResource('/images', ImageController::class)->except(['update', 'show']);
    Route::post('/images/{image:slug}', [ImageController::class, 'update']);
    Route::get('/images/{image:slug}', [ImageController::class, 'show']);

    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::get('/home/images', [HomeController::class, 'index']);
Route::get('/home/user/images', [HomeController::class, 'imagesByUser']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
