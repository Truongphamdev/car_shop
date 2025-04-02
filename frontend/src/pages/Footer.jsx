const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-200 py-16 mt-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Cột 1: Logo & Mô tả */}
                    <div>
                        <h2 className="text-4xl font-extrabold text-yellow-400">AutoShop</h2>
                        <p className="mt-3 text-gray-400">Chuyên cung cấp xe hơi cao cấp với giá tốt nhất.</p>
                        <div className="mt-4 flex space-x-3">
                            <a href="#" className="bg-blue-600 p-2 px-3 rounded-full hover:bg-blue-500 transition">
                                <i className="fa-brands fa-facebook text-xl"></i>
                            </a>
                            <a href="#" className="bg-pink-500 p-2 px-3 rounded-full hover:bg-pink-400 transition">
                                <i className="fa-brands fa-instagram text-xl"></i>
                            </a>
                            <a href="#" className="bg-sky-500 p-2 px-3 rounded-full hover:bg-sky-400 transition">
                                <i className="fa-brands fa-twitter text-xl"></i>
                            </a>
                            <a href="#" className="bg-red-600 p-2 px-3 rounded-full hover:bg-red-500 transition">
                                <i className="fa-brands fa-youtube text-xl"></i>
                            </a>
                        </div>
                    </div>

                    {/* Cột 2: Liên kết nhanh */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Liên kết</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-yellow-400 transition">Trang Chủ</a></li>
                            <li><a href="#" className="hover:text-yellow-400 transition">Sản Phẩm</a></li>
                            <li><a href="#" className="hover:text-yellow-400 transition">Giới Thiệu</a></li>
                            <li><a href="#" className="hover:text-yellow-400 transition">Liên Hệ</a></li>
                        </ul>
                    </div>

                    {/* Cột 3: Chính sách */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Hỗ trợ khách hàng</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-yellow-400 transition">Chính sách bảo hành</a></li>
                            <li><a href="#" className="hover:text-yellow-400 transition">Điều khoản & Điều kiện</a></li>
                            <li><a href="#" className="hover:text-yellow-400 transition">Chính sách đổi trả</a></li>
                            <li><a href="#" className="hover:text-yellow-400 transition">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Cột 4: Liên hệ */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Liên hệ</h3>
                        <p className="text-gray-400">Hotline: <span className="text-yellow-400">0123 456 789</span></p>
                        <p className="text-gray-400">Email: <span className="text-yellow-400">support@autoshop.com</span></p>
                        <p className="text-gray-400">Địa chỉ: 123 Nguyễn Văn Linh, Đà Nẵng</p>
                    </div>
                </div>

                {/* Dòng bản quyền */}
                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
                    © 2025 AutoShop. All rights reserved. Made with ❤️ by Trường Dev.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
