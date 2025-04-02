import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const [user_id,setUser] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/storelogin", {
                email,
                password,
            });
            console.log("Dữ liệu từ API:", res.data);
            setToken(res.data.token);
            setUser(res.data.user.id);
            localStorage.setItem("token", res.data.token); // Lưu token
            localStorage.setItem("current_id",res.data.user.id);
            setError(""); // Xóa lỗi nếu có
            if (res.data.user.is_admin === 1) {
                navigate("/admin");
            } else {
                navigate("/home");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Đăng nhập thất bại");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-blue-500 to-red-500">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
                <h3 className="text-center text-3xl font-bold text-purple-700 mb-6">🔑 Đăng Nhập</h3>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 border-l-4 border-red-500 shadow-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">📧 Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">🔒 Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition"
                    >
                        🚀 Đăng Nhập
                    </button>

                    <p className="text-center mt-4 text-gray-700">
                        ❓ Chưa có tài khoản?{" "}
                        <a href="/register" className="text-pink-600 font-semibold hover:underline">
                            Đăng ký ngay
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;