<header class="bg-white shadow-md">
    <div class="container mx-auto flex justify-between items-center py-4 px-6 h-[100px]">
        <!-- Logo -->
        <a href="{{ route('home') }}" class="text-4xl font-bold text-blue-600">
            AutoShop
        </a>

        <!-- Menu Điều Hướng -->
        <nav class="hidden md:flex space-x-8">
            <a href="{{ route('home') }}" 
               class="text-xl {{ request()->routeIs('home') ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-600' }}">
               Trang Chủ
            </a>
            
            <a href="{{Route('allCar')}}" 
               class="text-xl {{ request()->routeIs('allCar') ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-600' }}">
               Sản Phẩm
            </a>
            
            <a href="" 
               class="text-xl {{ request()->routeIs('') ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-600' }}">
               Giới Thiệu
            </a>
            
            <a href="" 
               class="text-xl {{ request()->routeIs('') ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-600' }}">
               Liên Hệ
            </a>
        </nav>
        

        <!-- Giỏ Hàng & Tài Khoản -->
        <div class="flex items-center space-x-4">
            <!-- Giỏ hàng -->
            <a href="" class="relative">
                <svg class="w-6 h-6 text-gray-700 hover:text-blue-600 transition" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3 3h2l1 4h13l1-4h2M5 21a2 2 0 100-4 2 2 0 000 4zm14 0a2 2 0 100-4 2 2 0 000 4zM7 8h10l1 9H6l1-9z" />
                </svg>
                <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">13</span>
            </a>

            @auth
                <!-- Dropdown User -->
                <div class="relative">
                    <button id="dropdown-btn" class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none">
                        <span>{{ Auth::user()->name }}</span>
                        <svg class="w-5 h-5 transition-transform" id="dropdown-icon" fill="none" stroke="currentColor" stroke-width="2"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <!-- Nội dung dropdown -->
                    <div id="dropdown-menu" style="z-index: 999" class="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md hidden">
                        <a href="" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Hồ sơ</a>
                        <form action="{{ route('logout') }}" method="POST">
                            @csrf
                            <button type="submit"
                                class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Đăng xuất</button>
                        </form>
                    </div>
                </div>
            @else
                <!-- Nút Đăng nhập -->
                <a href="{{ route('login') }}"
                    class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                    Đăng Nhập
                </a>
            @endauth
        </div>


</header>

<script>
    document.getElementById("dropdown-btn").addEventListener("click", function () {
        let menu = document.getElementById("dropdown-menu");
        let icon = document.getElementById("dropdown-icon");
        menu.classList.toggle("hidden");
        icon.classList.toggle("rotate-180");
    });


</script>
