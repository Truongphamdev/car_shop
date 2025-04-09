import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ListCar = () => {
    const [data, setData] = useState({
        cars: [],
        categories: [],
        currentPage: 1,
        lastPage: 1,
    });
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search,setSearch]= useState("");

    const fetchData = async (page = data.currentPage) => {
        setLoading(true);
        setError(null);
        try {
            // Sửa cú pháp URL: dùng ? cho tham số đầu tiên, & cho các tham số sau
            const url = `http://localhost:8000/allCar?page=${page}${
                selectedCategory ? `&category=${selectedCategory}` : ""
            }${search ? `&search=${search}` : ""}`;
            const response = await axios.get(url);
            
            console.log("Dữ liệu từ API:", response.data);
            setData({
                cars: response.data.cars.data || [],
                categories: response.data.categories || [],
                currentPage: response.data.cars.current_page,
                lastPage: response.data.cars.last_page,
            });
        } catch (error) {
            console.error("Error fetching cars", error);
            setError("Không thể tải danh sách xe. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(data.currentPage); // Gọi API khi mount hoặc khi selectedCategory/currentPage thay đổi
    }, [selectedCategory, data.currentPage,search]);

    const handlePrevious = () => {
        if (data.currentPage > 1) {
            setData((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
        }
    };

    const handleNext = () => {
        if (data.currentPage < data.lastPage) {
            setData((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
        }
    };

    return (
        <div className="container mx-auto py-12">
         <div className="flex flex-col sm:flex-row items-center justify-around gap-4 mb-6">
    <div className="flex gap-2 w-full sm:w-auto">
        <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm theo tên xe..."
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
            onClick={() => fetchData(1)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
            Tìm kiếm
        </button>
    </div>

    <div className="flex gap-2">
        <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
            <option value="">Tất cả danh mục</option>
            {data.categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
        <button
            onClick={() => fetchData(1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
            Lọc
        </button>
    </div>
</div>


            {/* Hiển thị danh sách xe */}
            {loading ? (
                <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : Array.isArray(data.cars) && data.cars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {data.cars.map((car) => (
                        <div
                            key={car.id}
                            className="bg-white shadow-lg rounded-lg p-4 transition-transform hover:scale-105"
                        >
                            <img
                                src={
                                    car.car_image?.[0]?.image_url
                                        ?`http://localhost:8000/${car.car_image[0].image_url}`
                                        : "/placeholder.jpg"
                                }
                                alt={car.name}
                                className="w-full h-48 object-cover rounded-lg hover:opacity-80"
                            />
                            <div className="mt-4">
                                <h3 className="text-xl font-semibold">{car.name}</h3>
                                <p className="text-gray-600">
                                    Thương hiệu: {car.brand?.name || "Không xác định"}
                                </p>
                                <p className="text-xl text-red-500 font-semibold mt-2">
                                    {car.price ? car.price.toLocaleString() : "N/A"} Đ
                                </p>
                            </div>
                            <Link
                                to={`/home/car/${car.id}`}
                                className="block bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 text-center hover:bg-blue-600"
                            >
                                Xem Chi Tiết
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">Không có xe nào để hiển thị.</p>
            )}

            {/* Nút phân trang đơn giản */}
            {!loading && !error && data.cars.length > 0 && (
                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={handlePrevious}
                        disabled={data.currentPage === 1}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">
                        Trang {data.currentPage} / {data.lastPage}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={data.currentPage === data.lastPage}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ListCar;