<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
    public function login(){
        return view('auth.login');
    }
    public function storelogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ], [
            'email.required' => 'Vui lòng nhập email.',
            'email.email' => 'Email không hợp lệ.',
            'password.required' => 'Vui lòng nhập mật khẩu.',
            'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự.',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            $token = $user->createToken('myapp')->plainTextToken; // Lỗi ở đây?
            if ($request->expectsJson()) {
                return response()->json(['token' => $token,'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'is_admin' => $user->is_admin, // Thêm is_admin
                    ],]);
            }

            return redirect()->route('home')->with('success', 'Đăng nhập thành công!');
        }

        if ($request->expectsJson()) {
            return response()->json(['error' => 'Sai email hoặc mật khẩu'], 401);
        }
        return back()->with('error', 'Sai email hoặc mật khẩu!');
    }

    // đăng ký
    public function register(){
        return view('auth.register');
    }

    public function storeregister(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed', // "confirmed" tự động kiểm tra password_confirmation
        ], [
            'name.required' => 'Vui lòng nhập họ tên.',
            'email.required' => 'Vui lòng nhập email.',
            'email.email' => 'Email không hợp lệ.',
            'email.unique' => 'Email này đã được sử dụng.',
            'password.required' => 'Vui lòng nhập mật khẩu.',
            'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự.',
            'password.confirmed' => 'Mật khẩu xác nhận không khớp.',
        ]);
        $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password), 
        ]);
        if ($request->expectsJson()) {
            return response()->json(['message' => 'Đăng ký thành công']);
        }
        Auth::login($user);
        return redirect()->route('home')->with('success', 'Đăng ký thành công!');
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Đã đăng xuất']);
    }
}
