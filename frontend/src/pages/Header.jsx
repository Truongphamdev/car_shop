import { useState, useEffect } from "react";
import { useNavigate,Link,useLocation } from "react-router-dom";
import axios from "axios";
import { useCart } from "./CartContext";

const Header = () => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const navigate = useNavigate();
    const carImages = JSON.parse(localStorage.getItem('carImages')) || {};
    const token = localStorage.getItem("token");
    const {cart,setCart,fetchCart} = useCart();
    
    useEffect(() => {
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

    useEffect(() => {
        fetchCart();
      }, [token]); 

    const handleCheckoutCart=()=> {
      navigate('/checkout')
    }

    //   remove cart
      const removeFromCart = async (id) => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.delete(`http://localhost:8000/home/removeCart/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          alert(response.data.message);
          setCart(cart.filter((item) => item.id !== id));
        } catch (error) {
          alert("Không thể xóa khỏi giỏ hàng!");
        }
      };
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
    console.log("cartItem",cart)
    const totalPrice = cart.reduce((sum, item) => sum + item.car.price * item.quantity, 0);
    // thêm số lượng
    const addQuantity = (id) => {
      setCart((prev) =>
        prev.map((item)=> item.id===id?{...item,quantity:item.quantity+1}:item)
      );
    };
    // giảm
    const subQuantity = (id)=> {
      setCart((prev)=>
      prev.map((item)=>
      item.id===id?{...item,quantity:item.quantity-1}:item
      )
      )
    }
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
                    <a href="/likes" className={`text-xl ${
                            window.location.pathname === "/likes"
                                ? "text-blue-600 font-bold"
                                : "text-gray-700 hover:text-blue-600"
                        }`}>
                        Yêu Thích
                    </a>
                </nav>

                {/* Giỏ Hàng & Tài Khoản */}
                <div className="flex items-center space-x-4">
          {/* Giỏ hàng */}
          <div className="relative">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative focus:outline-none"
            >
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
                {cart.length}
              </span>
            </button>

            {/* Dropdown Giỏ hàng */}
            {isCartOpen && (
              <div
                className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md p-4 z-50 max-h-96 overflow-y-auto"
                style={{ zIndex: 999 }}
              >
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center">Giỏ hàng trống</p>
                ) : (
                  <>
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center mb-4 border-b pb-2">
                        <img
                          src={`http://localhost:8000/${carImages[item.car_id]}`}
                          alt={item.car.name}
                          className="w-16 h-16 object-cover rounded-lg mr-2"
                        />
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold">{item.car.name}</h3>
                          <p className="text-xs text-gray-600">
                            {item.quantity} x{" "}
                           {item.car.price.toLocaleString()} Đ
                          </p>
                        </div>
                        <div>
                        <button
                      onClick={() => subQuantity(item.id)}
                      disabled={item.quantity <= 0}
                      className={`text-black-500 text-lg px-3 rounded-lg me-2
                        ${item.quantity <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-orange-800 bg-orange-500'}
                      `}
                    >
                      -
                    </button>
                      
                        <button onClick={()=>addQuantity(item.id)} className="text-black-500 text-lg px-3 rounded-lg hover:bg-yellow-800 bg-yellow-500">+</button>
                      </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          ❌
                        </button>

                      </div>
                    ))}
                    <div className="border-t pt-2">
                      <p className="text-sm font-bold">
                        Tổng tiền: {totalPrice.toLocaleString()} Đ
                      </p>
                      <button
                        
                        className="block mt-2 w-full bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600"
                        onClick={() => {setIsCartOpen(false);handleCheckoutCart()}}
                      >
                        Mua Ngay
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

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
                                    href="/profile"
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