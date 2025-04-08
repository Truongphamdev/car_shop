<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\CheckoutController;

use Illuminate\Support\Facades\Route;
Route::get('login', [AuthController::class, 'login'])->name('login');
Route::post('storelogin', [AuthController::class, 'storelogin'])->name('storelogin');
Route::get('register', [AuthController::class, 'register'])->name('register');
Route::post('storeregister', [AuthController::class, 'storeregister'])->name('storeregister');
Route::prefix('home')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    Route::middleware(['admin:sanctum'])->group(function() {
        Route::get('/admin', [AdminController::class, 'dashboard'])->name('admin.dashboard');
        Route::post('/addProduct',[AdminController::class,'addProduct'])->name('addProduct');
        Route::delete('/removecar/{id}',[AdminController::class,'destroy'])->name('destroy');
        // xóa user
        Route::delete('/removeuser/{id}',[AdminController::class,'destroyUser'])->name('destroyUser');
        // update product
        Route::post('/updateProduct/{id}',[AdminController::class,'updateProduct'])->name('updateProduct');
        // quản lý đơn hàng
        Route::get('/getorder',[AdminController::class,'getOrder']);
        Route::post('/postorder/{id}',[AdminController::class,'postorder']);
        // xóa order
        Route::delete('/removeorder/{id}',[AdminController::class,'destroyOrder']);

    });
    // lưu review
    Route::post('/storeReview/{id}',[CarController::class,'storeReview'])->name('storeReview');
    // xóa review
    Route::delete('deleteReview/{id}',[CarController::class,'removereview'])->name('removeReview');
    // lưu contact
    Route::post('/storeContact',[CarController::class,'storeContact'])->name('storeContact');
    // mua xe
    Route::get('/buycar/{id}',[CarController::class,'buycar'])->name('buycar');
    // cart
    Route::get('/cart',[CarController::class,'indexCart'])->name('indexCart');
    Route::post('/storeCart',[CarController::class,'storeCart'])->name('storeCart');
    Route::delete('/removeCart/{id}',[CarController::class,'removeCart'])->name("removeCart");
    Route::get('/likes',[CarController::class,'getlike']);
    Route::post('/addlike/{id}',[CarController::class,'addlike']);
    Route::delete('/removelike/{id}',[CarController::class,'removelike']);  
    // đổi thông tin
    Route::post('/updateaccount',[AuthController::class,'updateAccount']);
    // tt order
    Route::get('/getttorder',[CarController::class,'getttOrder']);
    // lấy liên hệ
    Route::get('/indexFeedback',[AdminController::class,'index']);
    Route::post('/reply/{id}',[AdminController::class,'reply']);
});
Route::get('/', function () {
    return redirect()->route('home');
});
Route::get('home',[CarController::class,'home'])->name('home');
Route::get('/category/{id}', [CarController::class, 'filterByCategory'])->name('category');
Route::get('home/car/{id}',[CarController::class,'carDetail'])->name('cardetail');
Route::get('/allCar',[CarController::class,'allCar'])->name('allCar');
Route::get('/shownews/{id}',[CarController::class,'shownews'])->name('shownews');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CheckoutController::class, 'getCart']);
    Route::get('/shipping-fees', [CheckoutController::class, 'getShippingFees']);
    Route::post('/apply-coupon', [CheckoutController::class, 'applyCoupon']);
    Route::post('/checkout', [CheckoutController::class, 'checkout']);
    Route::get('/coupon',[CheckoutController::class,'getcoupon']);
    Route::get('/getuser',[CheckoutController::class,'getuser']);
});