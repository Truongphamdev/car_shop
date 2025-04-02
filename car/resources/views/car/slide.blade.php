<div class="relative w-full">
    <div class="swiper mySwiper w-full">
        <div class="swiper-wrapper">
            @foreach ($sliders as $slide)
            <div class="swiper-slide">
                <img src="{{ asset('image/slide/' . $slide->image_url) }}" class="w-full h-[90vh] object-cover">
            </div>
            @endforeach
        </div>
        <!-- Nút điều hướng -->
        <div class="swiper-button-next !text-white"></div>
        <div class="swiper-button-prev !text-white"></div>
        <div class="swiper-pagination"></div>
    </div>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        var swiper = new Swiper(".mySwiper", {
            loop: true,  // Lặp vô hạn
            autoplay: { delay: 3000, disableOnInteraction: false },  // Tự động chạy
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }, // Nút điều hướng
            pagination: { el: ".swiper-pagination", clickable: true }, // Chấm tròn
        });
    });
</script>

<style>
    .swiper {
        width: 100%;
        
    }

    .swiper-button-next, .swiper-button-prev {
        color: white !important; /* Đổi màu nút sang trắng */
        width: 50px;
        height: 50px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .swiper-button-next:hover, .swiper-button-prev:hover {
        background: rgba(0, 0, 0, 0.8);
    }
</style>
