import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!formData.email || !formData.message || formData.message.length < 5) {
      setError("Vui lòng nhập email và tin nhắn (ít nhất 5 ký tự)!");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Vui lòng đăng nhập để gửi liên hệ!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/home/storeContact",
        {
          email: formData.email,
          message: formData.message,
          name: formData.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(response.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Lỗi khi gửi liên hệ:", error);
      console.log("Response lỗi:", error.response?.data);
      setError(error.response?.data?.message || "Không thể gửi liên hệ. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Tiêu đề */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy để lại thông tin của bạn và chúng tôi sẽ phản hồi nhanh nhất có thể!
          </p>
        </div>

        {/* Form Liên hệ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Gửi Thông Tin Liên Hệ</h2>
            {success && <p className="text-green-500 mb-4">{success}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Họ và Tên
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập email của bạn"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700">
                  Lời nhắn
                </label>
                <textarea
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={5}
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập lời nhắn của bạn"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Đang gửi..." : "Gửi Liên Hệ"}
              </button>
            </form>
          </div>

          {/* Thông tin liên hệ */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-4xl font-semibold text-gray-800 mb-6">Thông Tin Liên Hệ</h1>
            <div className="flex items-center mb-4 text-gray-700">
              <i className="fa-solid fa-map-pin text-xl text-blue-500 mr-4"></i>
              <p className="text-gray-700">123 Đường XYZ, Quận 1, TP.HCM</p>
            </div>
            <div className="flex items-center mb-4 text-gray-700">
              <i className="fa-brands fa-connectdevelop text-xl text-blue-500 mr-4"></i>
              <p className="text-gray-700">contact@website.com</p>
            </div>
            <div className="flex items-center mb-4 text-gray-700">
              <i className="fa-solid fa-phone text-xl text-blue-500 mr-4"></i>
              <p className="text-gray-700">+84 123 456 789</p>
            </div>
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Kết Nối Với Chúng Tôi</h3>
              <div className="flex justify-center space-x-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-facebook text-4xl text-blue-600 hover:text-blue-800 hover:scale-110 transition duration-300"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-instagram text-4xl text-pink-600 hover:text-pink-800 hover:scale-110 transition duration-300"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-linkedin text-4xl text-blue-700 hover:text-blue-900 hover:scale-110 transition duration-300"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bản đồ */}
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Địa Chỉ Của Chúng Tôi</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.992457104347!2d106.69097461495165!3d10.759291761829322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528af55b5f387%3A0x19da6ab3136227e4!2zMTIzIExhdGkgS2hpdCwgVHVhbiBGb3JtIFhhY3Q!5e0!3m2!1svi!2s!4v1637595996599!5m2!1svi!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;