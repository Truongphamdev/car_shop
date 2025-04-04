import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const NewsDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState({
        new: {},  // Sửa thành object thay vì mảng
        relatedNew: {}
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/shownews/${id}`) // Đổi API endpoint đúng với Laravel
            .then(response => setData(response.data))
            .catch(error => console.error("Lỗi khi lấy tin tức:", error));
        }, [id]);
        console.log("dữ liệu news",data)

    if (!data.new || !data.new.title) return <p className="text-center text-gray-500">Đang tải...</p>;

    return (
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
            {/* Tiêu đề bài viết */}
            <h1 className="text-4xl font-bold text-center">{data.new.title}</h1>
            <p className="text-center text-gray-500 mt-2">
                {data.new.created_at ? new Date(data.new.created_at).toLocaleDateString() : ""}
            </p>

            {/* Ảnh bài viết */}
            <div className="relative mt-6">
                <img src={`http://localhost:8000/${data.new.image_url}`} 
                     alt={data.new.title} 
                     className="w-full h-[400px] object-cover rounded-lg shadow-lg"/>
                <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
            </div>

            {/* Nội dung bài viết */}
            <div className="mt-8 text-lg leading-relaxed text-gray-800 space-y-4">
                {data.new.content}
            </div>

            {/* Chia sẻ mạng xã hội */}
            <div className="mt-8 flex justify-center gap-4">
                <a href="#" className="text-blue-500 hover:text-blue-700">Facebook</a>
                <a href="#" className="text-blue-400 hover:text-blue-600">Twitter</a>
                <a href="#" className="text-red-500 hover:text-red-700">LinkedIn</a>
            </div>

            {/* Các bài viết liên quan */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold">Bài viết liên quan</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {data.relatedNew && data.relatedNew.length > 0 ? (
                        data.relatedNew.map((news) => (
                            <div key={news.id} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition">
                                <img src={`http://localhost:8000/${news.image_url}`} 
                                     alt={news.title} 
                                     className="w-full h-40 object-cover rounded" />
                                <h3 className="text-lg font-semibold mt-2">{news.title}</h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    {news.content ? news.content.substring(0, 100) + "..." : ""}
                                </p>
                                <a href={`/news/${news.id}`} className="text-blue-500 hover:underline mt-2 inline-block">
                                    Đọc thêm →
                                </a>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Không có bài viết liên quan.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewsDetail;
