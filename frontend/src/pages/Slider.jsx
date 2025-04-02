import axios from "axios";
import { useEffect, useState } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = ({ sliders }) => {
    const [slide,setSlide] = useState("");
    useEffect(() => {
        new Swiper(".mySwiper", {
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            pagination: { el: ".swiper-pagination", clickable: true },
        });
    }, []);
    useEffect(()=> {
        axios.get("http://localhost:8000/slide")
        .then((res)=> {
            setSlide(res.data);
            console.log(res.data);
        })
        .catch(()=> {
            console.log("có lỗi");
        })
    })

    return (
        <div className="relative w-full">
            <div className="swiper mySwiper w-full">
                <div className="swiper-wrapper">
                    {sliders.map((slide, index) => (
                        <div key={index} className="swiper-slide">
                            <img src={slide.image_url} alt="Slide" className="w-full h-[90vh] md:h-[70vh] object-cover" />
                        </div>
                    ))}
                </div>
                {/* Nút điều hướng */}
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-pagination"></div>
            </div>
        </div>
    );
};

export default Slider;
