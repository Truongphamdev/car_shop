import axios from 'axios';
import { useState, useEffect } from 'react';

export const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setErrors] = useState({});
  const [order, setOrder] = useState([]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:8000/home/updateaccount',
        {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName('');
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      alert('Cập nhật thành công');
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert('Cập nhật thất bại, vui lòng thử lại!');
      }
    }
  };

  const getOrder = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:8000/home/getttorder', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrder(res.data.order);
      console.log('Thông tin đơn hàng:', res.data.order);
    } catch (error) {
      console.log('Có lỗi khi lấy thông tin đơn hàng');
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cột 1: Form cập nhật thông tin */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
            Cập nhật tài khoản
          </h2>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                👤 Họ và Tên
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                required
              />
              {error?.name && (
                <p className="text-red-500 text-sm mt-1">{error.name[0]}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                📧 Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                required
              />
              {error?.email && (
                <p className="text-red-500 text-sm mt-1">{error.email[0]}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                🔒 Mật khẩu
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              />
              {error?.password && (
                <p className="text-red-500 text-sm mt-1">{error.password[0]}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                🔒 Xác nhận mật khẩu
              </label>
              <input
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              />
              {error?.password_confirmation && (
                <p className="text-red-500 text-sm mt-1">
                  {error.password_confirmation[0]}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition"
            >
              ✅ Cập nhật
            </button>
          </form>
        </div>

        {/* Cột 2: Danh sách đơn hàng */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
            Đơn hàng của bạn
          </h2>
          {order.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              😢 Bạn chưa có đơn hàng nào
            </p>
          ) : (
            <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
              {order.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50"
                >
                  <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                    🧾 Đơn hàng #{item.id}
                  </h3>
                  <p className="text-sm text-gray-600">
                    🕒 Ngày đặt: {new Date(item.created_at).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    📦 Trạng thái:{' '}
                    <span
                      className={`font-semibold ${
                        item.status === 'canceled'
                          ? 'text-red-500'
                          : item.status === 'pending'
                          ? 'text-yellow-600'
                          : 'text-green-600'
                      }`}
                    >
                      {item.status === 'canceled'
                        ? 'Đã hủy'
                        : item.status === 'pending'
                        ? 'Đang vận chuyển'
                        : 'Đã hoàn thành'}
                    </span>
                  </p>

                  <div className="mt-3 space-y-2">
                    <h4 className="font-semibold text-gray-800">
                      🛻 Danh sách xe:
                    </h4>
                    {item.order_detail.map((detail, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center text-sm border-b border-gray-200 py-2"
                      >
                        <p>🚗 {detail.car.name}</p>
                        <p>Số lượng: {detail.quantity}</p>
                        <p>{detail.price.toLocaleString()} VND</p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-3 font-semibold text-right text-indigo-600">
                    💵 Tổng: {item.total_price.toLocaleString()} VND
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};