import React, { useEffect, useState } from "react";
import axios from "axios";

const Like = () => {
  const [likedCars, setLikedCars] = useState([]);

  useEffect(() => {
    fetchLike();
  }, []);
  const fetchLike = async ()=> {
    const token = localStorage.getItem("token")
    if(!token) {
      alert("bạn phải đăng nhập")
      return
    }
    try {
        const response = await axios.get('http://localhost:8000/home/likes',{headers:{Authorization:`Bearer ${token}`}})
        setLikedCars(response.data.likes);
        console.log(response.data)
    } catch (error) {
        console.log("có lỗi khi lấy kike")
    }

  }

  const removeLike= async (id)=> {
    const token = localStorage.getItem("token")
    try {
      await axios.delete(`http://localhost:8000/home/removelike/${id}`,{headers:{Authorization:`Bearer ${token}`}})
      fetchLike()
      console.log("đã xóa thành công yêu thích")
    } catch (error) {
      console.log("có lỗi khi xóa yêu thích")
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-red-600">Danh sách yêu thích ❤️</h2>
      {likedCars.length === 0 ? (
        <p className="text-gray-500">Bạn chưa yêu thích xe nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {likedCars.map((car) => (
            <div
              key={car.id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={`http://localhost:8000/${car.car_image[0].image_url}`}
                alt={car.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{car.name}</h3>
                <p className="text-gray-600">{car.description}</p>
                <p className="text-red-500 font-bold mt-2">{car.price.toLocaleString()} Đ</p>
                <button onClick={()=> removeLike(car.id)} className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl">
                  Bỏ thích
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Like;
