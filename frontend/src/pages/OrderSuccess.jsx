import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Tự động chuyển hướng về trang chủ sau 5 giây
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer); // Dọn dẹp khi component bị unmount
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600">🎉 Đặt hàng thành công! 🎉</h1>
        <p className="text-gray-600 mt-4">Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</p>
        <p className="text-gray-500 mt-2">Bạn sẽ được chuyển hướng về trang chủ sau 5 giây...</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
