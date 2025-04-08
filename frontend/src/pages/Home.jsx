import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import modules
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import anh1 from "../assets/images/slide/anh1.jpg"
import anh2 from "../assets/images/slide/anh2.jpg"
import anh3 from "../assets/images/slide/anh3.jpg"
import ChatraChat from "./ChatraChat";


const Home = () => {
    const [data, setData] = useState({
        categories: [],
        cars: [],
        reviews: [],
        news: [],
    });
    const slides = [anh1, anh2, anh3]; // Mảng ảnh tĩnh
    const [error, setError] = useState(null);
    const [categoryTitle, setCategoryTitle] = useState("Xe Nổi Bật");

    const navigate = useNavigate(); // Hook để điều hướng
    const location = useLocation(); // Hook để lấy query params
    useEffect(() => {
        document.title = "Trang chủ | My Website";
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const categoryId = searchParams.get("category_id");
        const currentCategory = data.categories.find(cat => cat.id === Number(categoryId));

        // Cập nhật tiêu đề danh mục xe
        setCategoryTitle(categoryId && currentCategory ? `Xe thuộc danh mục: ${currentCategory.name}` : "Xe Nổi Bật");
        axios
            .get(`http://localhost:8000/home${categoryId ? `?category_id=${categoryId}`:""}`)
            .then((response) => {
                console.log("Dữ liệu từ API /home:", response.data); // Debug
                setData(response.data);
            })
            .catch((error) => {
                setError(`Không thể tải dữ liệu từ server: ${error.message}`);
            });
    }, [location.search]);

    useEffect(() => {
        const swiper = new Swiper(".mySwiper", {
            modules: [Navigation, Pagination, Autoplay],
            loop: true,
            speed: 800,
            autoplay: { delay: 3000, disableOnInteraction: false },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            pagination: { el: ".swiper-pagination", clickable: true },
        });
    
    }, []);
    
    useEffect(() => {
        if (data.reviews.length > 0) {
            new Swiper(".reviewSwiper", {
                modules: [Navigation, Pagination, Autoplay], // Thêm modules vào đây
                loop: true,
                autoplay: { delay: 5000, disableOnInteraction: false, stopOnLastSlide: false },
                pagination: { el: ".swiper-pagination-reviews", clickable: true },
            });
        }
    }, [data.reviews]);

    const handleCategoryClick = (categoryId)=> {
        navigate(`?category_id=${categoryId}`);
    }

    return (
        <div>
            {error && <div className="text-red-500 text-center py-4">{error}</div>}
            <div className="relative w-full">
                <div className="swiper mySwiper w-full">
                    <div className="swiper-wrapper">
                        {slides.map((slide, index) => (
                            <div key={index} className="swiper-slide">
                                <img
                                    src={slide}
                                    alt={`Slide ${index}`}
                                    className="w-full h-[90vh] md:h-[90vh] object-cover"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>

            <section className="relative w-full h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white flex items-center">
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="container mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold uppercase">Khám Phá Xe Hơi Đẳng Cấp</h1>
                    <p className="mt-4 text-lg opacity-80">Tận hưởng những dòng xe mới nhất với giá ưu đãi tốt nhất.</p>
                    <a
                        href="/listCar"
                        className="mt-6 inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-lg transition transform hover:scale-105"
                    >
                        Khám Phá Ngay
                    </a>
                </div>
            </section>

            <section className="py-12 bg-gray-100">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-8">Danh Mục Xe</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {data.categories.map((category) => (
                            <div key={category.id} onClick={() => handleCategoryClick(category.id)} className="block bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition">
                                <h3 className="text-xl font-semibold">{category.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="cars" className="py-12">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">{categoryTitle}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {data.cars.map((car) => (
                            <div key={car.id} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition">
                                {Array.isArray(car.car_image) && car.car_image.length > 0 ? (
                                    <img
                                        src={`http://localhost:8000/${car.car_image[0].image_url}`}
                                        alt={car.name}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                ) : (
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt={car.name}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                )}
                                <h3 className="text-2xl font-semibold mt-4">{car.name}</h3>
                                <p className="text-gray-600 mt-2 font-semibold text-xl text-blue-600">
                                    {car.price ?car.price.toLocaleString() : "N/A"} Đ
                                </p>
                                <a
                                    href={`home/car/${car.id}`}
                                    className="mt-4 block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                >
                                    Xem Chi Tiết
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-16 bg-gray-900 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-8">Khách Hàng Nói Gì?</h2>
                    <div className="swiper reviewSwiper">
                        <div className="swiper-wrapper">
                            {data.reviews.map((review) => (
                                <div key={review.id} className="swiper-slide p-6 bg-gray-800 rounded-lg shadow-lg">
                                    <p className="text-gray-300 italic">"{review.comment || "Không có nội dung"}"</p>
                                    <h4 className="mt-4 text-lg font-semibold">{review.user.name}</h4>
                                </div>
                            ))}
                        </div>
                        <div className="swiper-pagination-reviews"></div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-100">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-8">Tin Tức Mới Nhất</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {data.news.map((article) => (
                            <div key={article.id} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition">
                                <img
                                    src={
                                        article.image_url
                                            ? `http://localhost:8000/${article.image_url}`
                                            : "https://via.placeholder.com/150"
                                    }
                                    alt={article.title}
                                    className="w-full md:h-[40vh] object-cover rounded-lg"
                                />
                                <h3 className="text-xl font-semibold mt-4">{article.title}</h3>
                                <p className="text-gray-600 mt-2">
                                    {article.content ? article.content.substring(0, 100) + "..." : "Không có nội dung"}
                                </p>
                                <a href={`/news/${article.id}`} className="mt-4 block text-blue-500 hover:underline">
                                    Đọc thêm →
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <ChatraChat/>
        </div>
    );
};

export default Home;