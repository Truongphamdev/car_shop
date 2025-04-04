import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";

const Checkout = () => {
  const [cartItems, setCart] = useState([]);
  const [car, setCar] = useState(null);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [paymentMethods] = useState(["cash", "credit_card", "momo", "vnpay"]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
console.log("dữ liêu; quý",location.state); // Kiểm tra dữ liệu state có đúng không

  useEffect(() => {
    fetchShippingOptions();
    fetchCoupons();
  }, []);

  // Lấy tt hàng
    useEffect(()=> {
      if(location.state?.fromCart){
        setCart(location.state.cartItems)
      }
      else {
        setCar(location.state.car);
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

      return car.quantity * car.price;
    } else {
      return cartItems.reduce((total,item)=>total+item.quantity*item.car.price,0)
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
        [{car_id: car.id, quantity: car.quantity, price: car.price}]:
        cartItems.map((item) => ({
          car_id: item.car_id,
          quantity: item.quantity,
          price: item.car.price,
        })),
      };

      const response = await axios.post("http://localhost:8000/checkout", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Đặt hàng thành công! Mã đơn hàng: " + response.data.order_id);
      setCart([]);
      navigate("/orderSuccess");
    } catch (error) {
      console.error("Lỗi đặt hàng:", error);
      alert("Lỗi đặt hàng: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container mx-auto py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-8">Thanh Toán</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Giỏ hàng */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">{car?"Xe Bạn Mua":"Giỏ hàng của bạn"}</h3>
          
          
            <ul>
                      {car ? (
            <li key={car.id} className="flex justify-between py-2 border-b">
              <span>{car.name} (x{car.quantity})</span>
              <span>{(car.price * car.quantity).toLocaleString()}$</span>
            </li>
          ) : cartItems.length === 0 ? (
            <p>Giỏ hàng trống</p>
          ) : (
            cartItems.map((item) => (
              <li key={item.id} className="flex justify-between py-2 border-b">
                <span>{item.car.name} (x{item.quantity})</span>
                <span>{(item.car.price * item.quantity).toLocaleString()}$</span>
              </li>
            ))
          )}


            
            </ul>
         
          <div className="mt-4">
            <p className="flex justify-between">
              <span>Tạm tính:</span>
              <span>{calculateSubtotal().toLocaleString()}đ</span>
            </p>
            <p className="flex justify-between">
              <span>Phí vận chuyển:</span>
              <span>{getShippingFee().toLocaleString()}đ</span>
            </p>
            <p className="flex justify-between">
              <span>Giảm giá:</span>
              <span>{discount.toLocaleString()}đ</span>
            </p>
            <p className="flex justify-between font-bold text-lg mt-2">
              <span>Tổng cộng:</span>
              <span>{calculateTotal().toLocaleString()}$</span>
            </p>
          </div>
          {/* Chọn mã giảm giá */}
          <div className="mt-4">
            <label className="block text-gray-700 mb-2">Chọn mã giảm giá</label>
            <select
              value={selectedCoupon || ""}
              onChange={handleCouponChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Không sử dụng mã</option>
              {coupons.map((coupon) => (
                <option key={coupon.id} value={coupon.code}>
                  {coupon.code} - Giảm {coupon.discount.toLocaleString()}đ
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Form Checkout */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Thông tin thanh toán</h3>
          <form onSubmit={handleCheckout}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phương thức vận chuyển</label>
              <select
                value={selectedShipping || ""}
                onChange={(e) => setSelectedShipping(parseInt(e.target.value))}
                className="w-full p-2 border rounded"
              >
                {shippingOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.region} - {option.fee.toLocaleString()}đ
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phương thức thanh toán</label>
              <select
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="w-full p-2 border rounded"
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
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Hoàn tất đơn hàng
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;