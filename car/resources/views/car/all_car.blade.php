@extends('layout.app')
@section('title', 'Tất Cả Sản Phẩm')

@section('content')
@include('car.header')

<div class="container mx-auto py-12">
    <h1 class="text-4xl font-bold text-center mb-8">Danh Sách Xe</h1>

    <!-- Bộ lọc danh mục -->
    <div class="mb-8">
        <form action="{{ route('allCar') }}" method="GET" class="flex flex-wrap items-center gap-4 justify-center">
            <select name="category" class="px-4 py-2 border rounded-lg">
                <option value="">Tất cả danh mục</option>
                @foreach ($categories as $category)
                    <option value="{{ $category->id }}" {{ request('category') == $category->id ? 'selected' : '' }}>
                        {{ $category->name }}
                    </option>
                @endforeach
            </select>
            <button type="submit" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Lọc
            </button>
        </form>
    </div>

    <!-- Hiển thị danh sách xe -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        @foreach ($cars as $car)
            <div class="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
                <img src="{{ asset($car->car_image->first()->image_url) }}" class="w-full h-48 object-cover rounded-lg hover:opacity-80">
                
                <div class="mt-4">
                    <h3 class="text-xl font-semibold">{{ $car->name }}</h3>
                    <p class="text-gray-600">Thương hiệu: {{ $car->brand->name }}</p>
                    <p class="text-xl text-red-500 font-semibold mt-2">{{ number_format($car->price) }} $</p>
                </div>

                <a href="{{ route('cardetail', $car->id) }}" class="block bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 text-center hover:bg-blue-600">
                    Xem Chi Tiết
                </a>
            </div>
        @endforeach
    </div>

    <!-- Phân trang -->
    <div class="mt-8">
        {{ $cars->links('pagination::tailwind') }}
    </div>
</div>
@include('car.footer')
@endsection

