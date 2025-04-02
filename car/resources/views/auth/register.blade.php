<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.tailwindcss.com"></script>

    <title>Register</title>
</head>
<body>
    

<div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-blue-500 to-green-500">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h3 class="text-center text-3xl font-bold text-indigo-700 mb-6">📝 Đăng Ký</h3>

        @if(session('error'))
            <div class="bg-red-100 text-red-700 p-3 rounded-lg mb-4 border-l-4 border-red-500 shadow-md">
                {{ session('error') }}
            </div>
        @endif

        <form action="{{Route('storeregister')}}" method="POST">
            @csrf

            <div class="mb-4">
                <label class="block text-gray-700 font-semibold">👤 Họ và Tên</label>
                <input type="text" name="name" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" required>
                @error('name') <p class="text-red-500 text-sm">{{ $message }}</p> @enderror
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-semibold">📧 Email</label>
                <input type="email" name="email" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition" required>
                @error('email') <p class="text-red-500 text-sm">{{ $message }}</p> @enderror
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-semibold">🔒 Mật khẩu</label>
                <input type="password" name="password" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition" required>
                @error('password') <p class="text-red-500 text-sm">{{ $message }}</p> @enderror
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-semibold">🔒 Xác nhận mật khẩu</label>
                <input type="password" name="password_confirmation" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition" required>
            </div>

            <button type="submit" class="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition">
                ✅ Đăng Ký
            </button>

            <p class="text-center mt-4 text-gray-700">
                📌 Đã có tài khoản? <a href="{{Route('login')}}" class="text-blue-600 font-semibold hover:underline">Đăng nhập ngay</a>
            </p>
        </form>
    </div>
</div>


</body>    
</html>

