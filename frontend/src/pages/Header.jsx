import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("token: ",token);
        if (token) {
            setIsLoggedIn(true);
            // Giả sử bạn có API để lấy thông tin user
            axios
                .get("http://localhost:8000/home/user", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setUserName(res.data.name); // Lấy tên user từ API
                    console.log("dữ liệu",res.data);
                })
                .catch(() => {
                    setIsLoggedIn(false);
                    localStorage.removeItem("token");
                });
        }
    }, []);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:8000/home/logout",
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            setUserName("");
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6 h-[100px]">
                {/* Logo */}
                <a href="/home" className="text-4xl font-bold text-blue-600">
                    AutoShop
                </a>

                {/* Menu Điều Hướng */}
                <nav className="hidden md:flex space-x-8">
                    <a
                        href="/home"
                        className={`text-xl ${
                            window.location.pathname === "/home"
                                ? "text-blue-600 font-bold"
                                : "text-gray-700 hover:text-blue-600"
                        }`}
                    >
                        Trang Chủ
                    </a>
                    <a
                        href="/listCar"
                        className={`text-xl ${
                            window.location.pathname === "/listCar"
                                ? "text-blue-600 font-bold"
                                : "text-gray-700 hover:text-blue-600"
                        }`}
                    >
                        Sản Phẩm
                    </a>
                    <a href="/about" className={`text-xl ${
                            window.location.pathname === "/about"
                                ? "text-blue-600 font-bold"
                                : "text-gray-700 hover:text-blue-600"
                        }`}>
                        Giới Thiệu
                    </a>
                    <a href="/contact" className={`text-xl ${
                            window.location.pathname === "/contact"
                                ? "text-blue-600 font-bold"
                                : "text-gray-700 hover:text-blue-600"
                        }`}>
                        Liên Hệ
                    </a>
                </nav>

                {/* Giỏ Hàng & Tài Khoản */}
                <div className="flex items-center space-x-4">
                    {/* Giỏ hàng */}
                    <a href="#" className="relative">
                        <svg
                            className="w-6 h-6 text-gray-700 hover:text-blue-600 transition"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3h2l1 4h13l1-4h2M5 21a2 2 0 100-4 2 2 0 000 4zm14 0a2 2 0 100-4 2 2 0 000 4zM7 8h10l1 9H6l1-9z"
                            />
                        </svg>
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            13
                        </span>
                    </a>

                    {isLoggedIn ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none"
                            >
                                <span>{userName}</span>
                                <svg
                                    className={`w-5 h-5 transition-transform ${
                                        isDropdownOpen ? "rotate-180" : ""
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Dropdown */}
                            <div
                                className={`absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md ${
                                    isDropdownOpen ? "block" : "hidden"
                                }`}
                                style={{ zIndex: 999 }}
                            >
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Hồ sơ
                                </a>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        </div>
                    ) : (
                        <a
                            href="/login"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                        >
                            Đăng Nhập
                        </a>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;