import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setErrors] = useState({});
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            const res = await axios.post("http://localhost:8000/storeregister", {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            console.log("Dữ liệu từ API:", res.data);
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token); // Lưu token
            navigate("/home");
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors); // Gán lỗi vào state
            } else {
                alert("Đăng ký thất bại, vui lòng thử lại!");
            }
        }
    };

    return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-blue-500 to-green-500">
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h3 className="text-center text-3xl font-bold text-indigo-700 mb-6">📝 Đăng Ký</h3>


        <form onSubmit={handleRegister}>
           

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold">👤 Họ và Tên</label>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" required/>
                {error?.name && <p className="text-red-500 text-sm">{error.name[0]}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold">📧 Email</label>
                <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition" required/>
                {error?.email && <p className="text-red-500 text-sm">{error.email[0]}</p>}
            </div>

            <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">🔒 Mật khẩu</label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error?.password && <p className="text-red-500 text-sm">{error.password[0]}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">🔒 Xác nhận mật khẩu</label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                        />
                        {error?.password_confirmation && <p className="text-red-500 text-sm">{error.password_confirmation[0]}</p>}
                    </div>
            <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition">
                ✅ Đăng Ký
            </button>

            <p className="text-center mt-4 text-gray-700">
                📌 Đã có tài khoản? <a href="/login" className="text-blue-600 font-semibold hover:underline">Đăng nhập ngay</a>
            </p>
        </form>
    </div>
</div>
    );
};

export default Register;