import { useEffect, useState } from "react";
import { useParams ,Link,useNavigate} from "react-router-dom";
import axios from "axios";

const CarDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [data,setData]=useState({
        car:null,
        reviews:[],
        relatedCars:[]
    })
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const current_id =localStorage.getItem('current_id');
    console.log("dữ liệu:",current_id)
 
    const handleDeleteReview = async (reviewId)=> {
        try {
            await axios.delete(`http://localhost:8000/home/deleteReview/${reviewId}`,{
                headers : {
                    Authorization:`Bearer ${localStorage.getItem("token")} `
                }}
            );
            alert("review đã được xóa");
            setData((prev) => ({
                ...prev,
                reviews: prev.reviews.filter(review => review.id !== reviewId)
            }));       
        } catch (error) {
            if (error.response.status === 403) {
                alert("Bạn không có quyền xóa review này!");
            } else {
                console.error("Lỗi khi xóa review", error);
            }
        }
    }
    
    const fetchCarDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/home/car/${id}`);
            setData({
                car: response.data.car || null,
                reviews: response.data.reviews || [],
                relatedCars: response.data.relatedCars || [],
            });
            setSelectedImage(response.data.car.car_image[0].image_url);
            console.log("dữ liệu dâtil",response.data)

        } catch (error) {
            setError("Không thể tải dữ liệu");
        } finally {
            setLoading(false);
        }
    };
    // add giỏ hàng
    const addtoCart = async () => {
        const carImages = JSON.parse(localStorage.getItem('carImages')) || {};
        carImages[data.car.id] = selectedImage;
        localStorage.setItem('carImages', JSON.stringify(carImages));
        const token = localStorage.getItem("token")
        try {
            if(!token) {
                alert("Bạn cần đăng nhập để thêm vào giỏ hàng!");
            } 
            const response = await axios.post("http://localhost:8000/home/storeCart",
                {car_id:data.car.id,quantity:1},
                {headers:{
                    Authorization:`Bearer ${token}`
                }}
            );
            alert(response.data.message);

        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Không thể thêm vào giỏ hàng!");
        }
    }
    useEffect(() => {
        fetchCarDetail();
        window.scrollTo(0, 0);
    }, [id]);

    const handleSelectImage = (image) => {
        setSelectedImage(image);
    };

    // Khi bấm "Mua xe", chuyển sang `BuyCar` và truyền ảnh đã chọn
    const handleBuyCar = () => {
        localStorage.setItem('selectedCarImage', JSON.stringify(selectedImage));
        navigate(`/buycar/${data.car.id}`);
    };
    const addlike = async (id) => {
        try {
          const token = localStorage.getItem("token"); // hoặc cách bạn lưu token
          const res = await axios.post(
            `http://localhost:8000/home/addlike/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Đã thêm vào yêu thích:", res.data.message);
          alert("đã thêm vào yêu thích");
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert("Xe này đã nằm trong danh sách yêu thích!");
              } else {
                console.error("Có lỗi khi thêm like", error);
              }
        }
      };
      

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Bạn cần đăng nhập để gửi đánh giá!");
            alert("Bạn cần đăng nhập để gửi đánh giá!");
        }
        try {
            const response = await axios.post(`http://localhost:8000/home/storeReview/${id}`, { comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setData((prev) => ({
                ...prev,
                reviews: [...prev.reviews, response.data.review],
            }));
            setComment(""); // Reset textarea
            alert(response.data.message);
            await fetchCarDetail();
        } catch (error) {
            console.error("Lỗi khi gửi đánh giá", error);
        }
    };

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto py-12">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ms-8">
                <div>
                    <img id="mainImage" src={`http://localhost:8000/${selectedImage}`} className="w-full h-[400px] object-cover rounded-lg" />
                    <div className="grid grid-cols-4 gap-2 mt-4">
                        {data.car.car_image.map((image, index) => (
                            <img key={index} src={`http://localhost:8000/${image.image_url}`}  onClick={() => handleSelectImage(image.image_url)}  className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80" />
                        ))}
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold">{data.car.name}</h1>
                    <p className="text-gray-600">Thương hiệu: {data.car.brand.name}</p>
                    <p className="text-gray-600">Danh mục: {data.car.category.name}</p>
                    <p className="text-xl text-red-500 font-semibold mt-4">Giá: {data.car.price.toLocaleString()} $</p>
                    <p className="mt-4">{data.car.description}</p>

                <div className="flex space-x-4 mt-6">

                    <button onClick={handleBuyCar} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Mua xe
                    </button>
                    <button onClick={addtoCart} className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
                        Thêm vào giỏ hàng
                    </button>
       
                </div>

                    <button onClick={()=> addlike(data.car.id)} className="px-6 mt-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        Thêm vào Yêu thích
                    </button>
                </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-lg me-20">
            <h2 className="text-2xl font-bold">Đánh giá từ chuyên gia</h2>
            <p className="mt-4 text-gray-700">
                "Chiếc { data.car.name } được đánh giá cao về hiệu suất và độ bền. Với động cơ { data.car.engine }, công suất { data.car.power } HP, đây là lựa chọn hàng đầu cho những ai yêu thích xe mạnh mẽ."
            </p>
            <p className="mt-2 italic text-gray-500">— Tạp chí Ô tô Việt Nam</p>
        </div>
            </div>
{/* Thông số kỹ thuật */}
<div className="mt-12 mx-8">
                <h2 className="text-2xl font-bold">Thông số kỹ thuật</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        Công suất: {data.car.power || "N/A"} HP
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        Động cơ: {data.car.engine || "N/A"}
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        Số chỗ: {data.car.seats || "N/A"} chỗ
                    </div>
                </div>
            </div>
            <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Đánh giá từ khách hàng</h2>

<div className="mt-4 space-y-4">
    {data.reviews.length > 0 ? (
        data.reviews.map((review, index) => (
            <div key={index} className="bg-white shadow-lg p-5 rounded-lg border border-gray-200 relative">
                <p className="text-gray-700 italic text-lg">"{review.comment}"</p>
                <h4 className="font-semibold mt-3 text-blue-600">{review.user.name}</h4>

                {review.user_id == current_id && (
                    <button
                        className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition duration-300"
                        onClick={() => handleDeleteReview(review.id)}
                    >
                        ❌
                    </button>
                )}
            </div>
        ))
    ) : (
        <p className="text-gray-500 italic">Chưa có đánh giá nào.</p>
    )}
</div>

                <form onSubmit={handleSubmitReview} className="mt-6 bg-gray-100 p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Viết đánh giá của bạn</h3>
                    <textarea minLength={5} value={comment} onChange={(e) => setComment(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg"></textarea>
                    <button type="submit"  className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg">Gửi đánh giá</button>
                </form>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold">Xe liên quan</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-4">
                    {data.relatedCars.map((related) => (
                        <div key={related.id} className="bg-white shadow-lg rounded-lg p-4">
                            <img src={`http://localhost:8000/${related.car_image[0].image_url}`} className="w-full h-48 object-cover rounded-lg" />
                            <h3 className="text-xl font-semibold mt-4">{related.name}</h3>
                            <p className="text-red-500 font-semibold">{related.price.toLocaleString()} $</p>
                            <Link
                                to={`/home/car/${related.id}`}
                                className="block bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 text-center hover:bg-blue-600"
                            >
                                Xem chi tiết
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CarDetail;