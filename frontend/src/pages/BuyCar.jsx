import React, { useState, useEffect } from "react";
import { useParams, useLocation,useNavigate  } from "react-router-dom";
import axios from "axios";

const BuyCar = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedImage = JSON.parse(localStorage.getItem('selectedCarImage'));

  // Lấy thông tin xe từ API
  const fetchCarDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
    alert("vui lòng đăng nhập để gửi liên hệ");
      setError("Vui lòng đăng nhập để gửi liên hệ!");
      setLoading(false);
      return;
    }
      try {
        const response = await axios.get(`http://localhost:8000/home/buycar/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCar(response.data.car); // Dữ liệu xe nằm trong response.data.car
        setLoading(false);
        console.log("Dữ liệu buycar:", response.data.car);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin xe:", error);
        setError("Không thể tải thông tin xe. Vui lòng thử lại!");
        setLoading(false);
      }
    
  };

  // // Xử lý mua xe
  // const handleConfirmPurchase = async () => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8000/home/buycar/${id}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     alert(response.data.message || "Cảm ơn bạn đã mua xe! Chúng tôi sẽ liên hệ sớm nhất.");
  //     setIsModalOpen(false);
  //   } catch (error) {
  //     console.error("Lỗi khi mua xe:", error);
  //     alert(error.response?.data?.message || "Không thể thực hiện mua xe. Vui lòng thử lại!");
  //   }
  // };

  const handleCheckoutCar = () => {
    navigate('/checkout',{state:{car,fromCar:true}})
  }

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const handleBuyClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-gray-600">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-red-500">{error}</div>
      </div>
    );
  }

  // Tạo danh sách đặc điểm từ dữ liệu xe
  const features = [
    `Động cơ: ${car.engine}`,
    `Công suất: ${car.power} mã lực`,
    `Số ghế: ${car.seats}`,
    `Số lượng còn lại: ${car.quantity}`,
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Tiêu đề */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 animate-fadeIn">
            Mua Xe Của Sự Lựa Chọn
          </h1>
          <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
            Khám phá chiếc xe hoàn hảo dành cho bạn với thiết kế đẳng cấp và công nghệ tiên tiến.
          </p>
        </div>

        {/* Thông tin xe */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white shadow-2xl rounded-xl p-8 transform hover:scale-105 transition-transform duration-300">
          {/* Hình ảnh xe */}
          <div className="relative">
            <img
              src={`http://localhost:8000/${selectedImage}`|| "https://via.placeholder.com/600x400?text=No+Image"}
              alt={car.name}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
            <div className="absolute top-0 left-0 bg-blue-600 text-white px-4 py-2 rounded-tl-lg rounded-br-lg">
              <span className="text-sm font-semibold">Mới 100%</span>
            </div>
          </div>

          {/* Chi tiết xe */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">{car.name}</h2>
              <p className="text-xl font-bold text-blue-600 mb-4">
              Giá: {car.price.toLocaleString()} Đ
              </p>
              <p className="text-gray-600 mb-6">{car.description}</p>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Nút Mua xe */}
            <button
              onClick={handleBuyClick}
              className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transform hover:scale-105 transition-all duration-300"
            >
              Mua Xe Ngay
            </button>
          </div>
        </div>

        {/* Modal xác nhận */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl transform scale-95 transition-transform duration-300">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Xác Nhận Mua Xe</h3>
              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn mua <strong>{car.name}</strong> với giá{" "}
                <strong>Giá: {car.price.toLocaleString()} Đ </strong> không?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors duration-300"
                >
                  Hủy
                </button>
                <button
                
                  onClick={handleCheckoutCar}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Xác Nhận
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    
    </div>
  );
};

export default BuyCar;