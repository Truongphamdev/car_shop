@extends('layout.app')
@section('title','Trang chủ')

@section('content')
{{-- @include('car.header') --}}
@if(session('success'))
    <div class="bg-green-100 text-green-600 p-2 rounded-md mb-3">
        {{ session('success') }}
    </div>
@endif
@include('car.header')

@include('car.slide')
<!-- Hero Section -->
<section class="relative w-full h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white flex items-center">
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    <div class="container mx-auto text-center relative z-10">
        <h1 class="text-5xl md:text-7xl font-bold uppercase animate-fade-in">Khám Phá Xe Hơi Đẳng Cấp</h1>
        <p class="mt-4 text-lg opacity-80">Tận hưởng những dòng xe mới nhất với giá ưu đãi tốt nhất.</p>
        <a href="#cars" class="mt-6 inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-lg transition transform hover:scale-105">
            Khám Phá Ngay
        </a>
    </div>
</section>

<!-- Danh Mục Xe -->
<section class="py-12 bg-gray-100">
    <div class="container mx-auto text-center">
        <h2 class="text-4xl font-bold mb-8">Danh Mục Xe</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            @foreach ($categories as $category)
                <a href="{{ route('category', ['id' => $category->id]) }}" class="block bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition">
                    <h3 class="text-xl font-semibold">{{ $category->name }}</h3>
                </a>
            @endforeach
        </div>
    </div>
</section>

<!-- Danh sách xe -->
<section id="cars" class="py-12">
    <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-6">
        {{ request('category_id') ? "Xe thuộc danh mục: " . $categories->firstWhere('id', request('category_id'))->name : "Xe Nổi Bật" }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @foreach ($cars as $car)
                <div class="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition">
                    <img src="{{ asset($car->car_image->first()->image_url) }}" class="w-full h-48 object-cover rounded-lg">
                    <h3 class="text-2xl font-semibold mt-4">{{ $car->name }}</h3>
                    <p class="text-gray-600 mt-2 font-semibold text-xl text-blue-600">{{ number_format($car->price) }} $</p>
                    <div class="flex justify-center mt-2">
                        <span class="text-yellow-400 text-lg">★★★★★</span>
                    </div>
                    <a href="{{Route('cardetail',$car->id)}}" class="mt-4 block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                        Xem Chi Tiết
                    </a>
                </div>
            @endforeach
        </div>
    </div>
</section>

<!-- Phản hồi khách hàng -->
<section class="py-16 bg-gray-900 text-white">
    <div class="container mx-auto text-center">
        <h2 class="text-4xl font-bold mb-8">Khách Hàng Nói Gì?</h2>
        <div class="swiper mySwiper h-64">
            <div class="swiper-wrapper">
                @foreach ($reviews as $review)
                    <div class="swiper-slide p-6 bg-gray-800 rounded-lg shadow-lg">
                        <p class="text-gray-300 italic">"{{ $review->comment }}"</p>
                        <h4 class="mt-4 text-lg font-semibold">{{ $review->user->name }}</h4>
                    </div>
                @endforeach
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</section>

<!-- Tin tức xe -->
<section class="py-16 bg-gray-100">
    <div class="container mx-auto text-center">
        <h2 class="text-4xl font-bold mb-8">Tin Tức Mới Nhất</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @foreach ($news as $article)
                <div class="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition">
                    <img src="{{ asset('image/new/'.$article->image_url) }}" class="w-full h-40 object-cover rounded-lg">
                    <h3 class="text-xl font-semibold mt-4">{{ $article->title }}</h3>
                    <p class="text-gray-600 mt-2">{{ Str::limit($article->content, 100) }}</p>
                    <a href="#" class="mt-4 block text-blue-500 hover:underline">
                        Đọc thêm →
                    </a>
                </div>
            @endforeach
        </div>
    </div>
</section>
@include('car.footer')