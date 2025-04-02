@extends('layout.app')
@section('title','tran chi tiết')

@section('content')
@include('car.header')

<div class="container mx-auto py-12">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mx-8">
        <!-- Ảnh xe -->
        <div>
            <img id="mainImage" src="{{ asset($car->car_image->first()->image_url) }}" class="w-full h-[400px] object-cover rounded-lg">
            <div class="grid grid-cols-4 gap-2 mt-4">
                @foreach ($car->car_image as $image)
                    <img src="{{ asset($image->image_url) }}" onclick="changeMainImage(this)" class="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80">
                @endforeach
            </div>
        </div>

        <!-- Thông tin chính -->
        <div>
            <h1 class="text-3xl font-bold">{{ $car->name }}</h1>
            <p class="text-gray-600 text-lg mt-2">Thương hiệu: {{ $car->brand->name }}</p>
            <p class="text-gray-600 text-lg">Danh mục: {{ $car->category->name }}</p>
            <p class="text-xl text-red-500 font-semibold mt-4">Giá: {{ number_format($car->price) }} $</p>
            <p class="mt-4">{{ $car->description }}</p>
            <button class="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Mua xe</button>
        </div>

        <!-- Đánh giá từ chuyên gia -->
        <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold">Đánh giá từ chuyên gia</h2>
            <p class="mt-4 text-gray-700">
                "Chiếc {{ $car->name }} được đánh giá cao về hiệu suất và độ bền. Với động cơ {{ $car->engine }}, công suất {{ $car->power }} HP, đây là lựa chọn hàng đầu cho những ai yêu thích xe mạnh mẽ."
            </p>
            <p class="mt-2 italic text-gray-500">— Tạp chí Ô tô Việt Nam</p>
        </div>
    </div>    <!-- Thông số kỹ thuật -->
    <div class="mt-12">
        <h2 class="text-2xl font-bold">Thông số kỹ thuật</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div class="bg-gray-100 p-4 rounded-lg">Công suất: {{ $car->power }} HP</div>
            <div class="bg-gray-100 p-4 rounded-lg">Động cơ: {{ $car->engine }}</div>
            <div class="bg-gray-100 p-4 rounded-lg">Số chỗ: {{ $car->seats }} chỗ</div>
        </div>
    </div>

<!-- Đánh giá khách hàng -->
<div class="mt-12">
    <h2 class="text-2xl font-bold">Đánh giá từ khách hàng</h2>
    
    <!-- Hiển thị đánh giá hiện có -->
    <div class="mt-4">
        @if(isset($reviews) && count($reviews) > 0)
            @foreach ($reviews as $review)
                <div class="bg-white shadow-md p-4 rounded-lg mb-4">
                    <p class="text-gray-600 italic">"{{ $review->comment }}"</p>
                    <h4 class="font-semibold mt-2">{{ $review->user->name }}</h4>
                </div>
            @endforeach
        @else 
            <h2 class="mt-2 text-sky-600">Chưa có đánh giá nào</h2>
        @endif
    </div>

    <!-- Form nhập đánh giá -->
    <div class="mt-6 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-semibold mb-4">Viết đánh giá của bạn</h3>
        
        @if(session('success'))
            <p class="text-green-500">{{ session('success') }}</p>
        @endif
        
        <form action="{{Route('storeReview',$car->id)}}" method="POST">
            @csrf
            <div class="mb-4">
                <label for="comment" class="block text-gray-700 font-medium">Nội dung đánh giá:</label>
                <textarea name="comment" required id="comment" rows="4" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
            </div>
            
            <button type="submit" class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Gửi đánh giá</button>
        </form>
    </div>
</div>

    <!-- Xe liên quan -->
    <div class="mt-12">
        <h2 class="text-2xl font-bold">Xe liên quan</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mt-4">
            @foreach ($relatedCars as $related)
                <div class="bg-white shadow-lg rounded-lg p-4">
                    <img src="{{ asset($related->car_image->first()->image_url) }}" class="w-full h-48 object-cover rounded-lg">
                    <h3 class="text-xl font-semibold mt-4">{{ $related->name }}</h3>
                    <p class="text-red-500 font-semibold">{{ number_format($related->price) }} $</p>
                    <a href="{{ route('cardetail', $related->id) }}" class="block bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 text-center hover:bg-blue-600">Xem chi tiết</a>
                </div>
            @endforeach
        </div>
    </div>
</div>
@endsection
@section('js')
    <script>
        function changeMainImage(element) {
    let mainImage = document.getElementById("mainImage");
    mainImage.src = element.src;
}
    </script>
    @include('car.footer')

@endsection
