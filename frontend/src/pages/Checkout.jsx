import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
const Checkout = () => {
  const [car, setCar] = useState(null);

  const [shippingOptions, setShippingOptions] = useState([]);
  const [paymentMethods] = useState(["cash", "credit_card", "momo", "vnpay"]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [user,setUser]= useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const {cart,setCart,fetchCart} = useCart();
console.log("dữ liêu; quý",location.state); // Kiểm tra dữ liệu state có đúng không
const selectedImage = JSON.parse(localStorage.getItem('selectedCarImage'));

  useEffect(() => {
    fetchShippingOptions();
    fetchCoupons();
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      try {
        const res = await axios.get('http://localhost:8000/getuser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
        console.log("User data:", res.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };
  
    fetchUser();
  }, [token]);
  
  // Lấy tt hàng
    useEffect(()=> {
      if(location.state?.fromCar){
        setCar(location.state.car)
      }
      else {
        setCart(cart);
  console.log("dữ liệu cart",cart)

      }
    },[location.state])

  
  // Lấy tùy chọn vận chuyển
  const fetchShippingOptions = async () => {
    try {
      const response = await axios.get("http://localhost:8000/shipping-fees",
        {headers: { Authorization: `Bearer ${token}` }},
      );
      setShippingOptions(response.data);
      setSelectedShipping(response.data[0]?.id); // Chọn mặc định
    } catch (error) {
      console.error("Lỗi lấy phí vận chuyển:", error);
    }
  };
  const formatPrice = (price) => {
    // Chuyển đổi từ 350000.000 thành 350000 và định dạng
    const integerPrice = Math.floor(price); // Loại bỏ .000
    return integerPrice.toLocaleString('vi-VN'); // Thêm dấu phẩy: 350,000
  };
  // Lấy danh sách mã giảm giá
  const fetchCoupons = async () => {
    try {
      const response = await axios.get("http://localhost:8000/coupon", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCoupons(response.data);
      if (response.data.length > 0) {
        setSelectedCoupon(response.data[0].code);
        applyCoupon(response.data[0].code);
      }
    } catch (error) {
      console.error("Lỗi lấy mã giảm giá:", error);
    }
  };

  // Áp dụng mã giảm giá
  const applyCoupon = async (code) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:8000/apply-coupon",
        { code },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDiscount(response.data.discount);
    } catch (error) {
      console.error("Lỗi áp dụng mã giảm giá:", error);
      setDiscount(0);
    }
  };

  // Xử lý khi chọn mã giảm giá
  const handleCouponChange = (e) => {
    const code = e.target.value;
    setSelectedCoupon(code);
    if (code) {
      applyCoupon(code);
    } else {
      setDiscount(0);
    }
  };

  // Tính tổng tiền giỏ hàng
  const calculateSubtotal = () => {
    if(car) {
      return car.price;
    } else {
      return cart.reduce((total,item)=>total+item.quantity*item.car.price,0)
    }
  };

  // Lấy phí vận chuyển
  const getShippingFee = () => {
    const shipping = shippingOptions.find((option) => option.id === selectedShipping);
    return shipping ? shipping.fee : 0;
  };

  // Tính tổng tiền cuối cùng
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shippingFee = getShippingFee(); 
    console.log("giá gân ftoongr",subtotal);
    console.log("giá ship",shippingFee);
    return subtotal + shippingFee - discount;
  };

  // Xử lý đặt hàng
  const handleCheckout = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    if (!selectedShipping || !selectedPayment) {
      alert("Vui lòng chọn phương thức vận chuyển và thanh toán!");
      return;
    }

    try {
      const orderData = {
        shipping_fee_id: selectedShipping,
        payment_method: selectedPayment,
        total_price: calculateTotal(),
        coupon_code: selectedCoupon || null,
        
        items: car?
        [{car_id: car.id, quantity: 1, price: car.price}]:
        cart.map((item) => ({
          car_id: item.car_id,
          quantity: item.quantity,
          price: item.car.price,
        })),
      };

      const response = await axios.post("http://localhost:8000/checkout", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Đặt hàng thành công! Mã đơn hàng: " + response.data.order_id);
      fetchCart();
      navigate("/orderSuccess");
    } catch (error) {
      console.error("Lỗi đặt hàng:", error);
      alert("Lỗi đặt hàng: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">Thanh Toán</h2>
  
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {/* Giỏ hàng */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h3 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800">
          {car ? "Xe Bạn Mua" : "Giỏ hàng của bạn"}
        </h3>
  
        <ul className="divide-y divide-gray-200">
          {car ? (
            <li className="flex justify-between py-3 text-gray-700">
        <span className="font-medium">{car.name} (x{car.quantity || 1})</span>
        <img src={`http://localhost:8000/${selectedImage}`} className="w-[100px] rounded" alt={car.name} />
              <span className="text-gray-900 font-semibold">
                {car.price.toLocaleString()} Đ
              </span>
            </li>
          ) : cart.length === 0 ? (
            <p className="text-center text-gray-500 py-6">Giỏ hàng trống</p>
          ) : (
            cart.map((item) => (
              <li key={item.id} className="flex justify-between py-3 text-gray-700">
                <span className="font-medium">{item.car.name} (x{item.quantity})</span>
        <img src={`http://localhost:8000/${item.car.car_image[0].image_url}`} className="w-[100px] rounded" alt={item.car.name} />
                <span className="text-gray-900 font-semibold">
                  {(item.car.price * item.quantity).toLocaleString()} Đ
                </span>
              </li>
            ))
          )}
        </ul>
  
        <div className="mt-6 space-y-3 border-t pt-4">
          <p className="flex justify-between text-gray-600">
            <span>Tạm tính:</span>
            <span>{calculateSubtotal().toLocaleString()} đ</span>
          </p>
          <p className="flex justify-between text-gray-600">
            <span>Phí vận chuyển:</span>
            <span>{getShippingFee().toLocaleString()} đ</span>
          </p>
          <p className="flex justify-between text-gray-600">
            <span>Giảm giá:</span>
            <span>{discount.toLocaleString()} đ</span>
          </p>
          <p className="flex justify-between text-lg font-bold text-gray-800 mt-2">
            <span>Tổng cộng:</span>
            <span>{calculateTotal().toLocaleString()} Đ</span>
          </p>
        </div>
  
        {/* Chọn mã giảm giá */}
        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2">Chọn mã giảm giá</label>
          <select
            value={selectedCoupon || ""}
            onChange={handleCouponChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
          >
            <option value="">Không sử dụng mã</option>
            {coupons.map((coupon) => (
              <option key={coupon.id} value={coupon.code}>
                {coupon.code} - Giảm {(coupon.discount).toLocaleString()} đ
              </option>
            ))}
          </select>
        </div>
      </div>
  
      {/* Thông tin khách hàng & Thanh toán */}
      <div className="space-y-6">
        {/* Thông Tin Khách Hàng */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h1 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">Thông Tin Khách Hàng</h1>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Tên:</span> {user.name || "Chưa có tên"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Email:</span> {user.email || "Chưa có email"}
          </p>
        </div>
  
        {/* Form Checkout */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800">Thông tin thanh toán</h3>
          <form onSubmit={handleCheckout} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phương thức vận chuyển</label>
              <select
                value={selectedShipping || ""}
                onChange={(e) => setSelectedShipping(parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
              >
                {shippingOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.region} - {option.fee.toLocaleString()} đ
                  </option>
                ))}
              </select>
            </div>
  
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phương thức thanh toán</label>
              <select
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
              >
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method === "cash" ? "Tiền mặt" : method === "credit_card" ? "Thẻ tín dụng" : method}
                  </option>
                ))}
              </select>
            </div>
  
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              Hoàn tất đơn hàng
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Checkout;