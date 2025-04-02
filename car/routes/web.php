<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CarController;
use Illuminate\Support\Facades\Route;
Route::get('login', [AuthController::class, 'login'])->name('login');
Route::post('storelogin', [AuthController::class, 'storelogin'])->name('storelogin');
Route::get('register', [AuthController::class, 'register'])->name('register');
Route::post('storeregister', [AuthController::class, 'storeregister'])->name('storeregister');
Route::prefix('home')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    Route::middleware(['admin'])->group(function() {
        Route::get('/admin', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    });
    // lưu review
    Route::post('/storeReview/{id}',[CarController::class,'storeReview'])->name('storeReview');
    // xóa review
    Route::delete('deleteReview/{id}',[CarController::class,'removereview'])->name('removeReview');
    // lưu contact
    Route::post('/storeContact',[CarController::class,'storeContact'])->name('storeContact');
    
});
Route::get('/', function () {
    return redirect()->route('home');
});
Route::get('home',[CarController::class,'home'])->name('home');
Route::get('/category/{id}', [CarController::class, 'filterByCategory'])->name('category');
Route::get('home/car/{id}',[CarController::class,'carDetail'])->name('cardetail');
Route::get('/allCar',[CarController::class,'allCar'])->name('allCar');