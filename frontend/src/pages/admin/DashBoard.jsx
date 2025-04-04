import { useEffect, useState } from "react";
import axios from "axios";

const DashBoard = () => {
  const [data, setData] = useState({ cars: [], users: [] ,categories:[],brands:[]});
  const [form, setForm] = useState({ name: "",category_id:"",brand_id:"", price: "", description: "", images: [], image_urls: [] });
  const [formedit, setFormedit] = useState({ name: "",category_id:"",brand_id:"", price: "", description: "", images: [], image_urls: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [orders,setOrders]=useState([]);

  useEffect(() => {
    fetchAdmin();
    fetchOrder()
  }, []);

  const token = localStorage.getItem("token");
  const fetchAdmin = async () => {
    try {
      const response = await axios.get("http://localhost:8000/home/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
      console.log("dữ liệu từ admin",response.data)
    } catch (error) {
      console.error("Lỗi lấy dữ liệu admin:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setForm({
      ...form,
      images: files,  // Lưu các tệp ảnh vào state
      image_urls: imageUrls, // Lưu URL tạm thời để hiển thị ảnh
    });
  };
  
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
          formData.append("name", form.name);
          formData.append("category_id", form.category_id);
          formData.append("brand_id", form.brand_id);
          formData.append("price", form.price);
          formData.append("description", form.description);
    
          // Thêm từng file ảnh vào FormData
          form.images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
          });
        const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/home/addProduct", formData, {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "multipart/form-data",
      });
      fetchAdmin();
      setForm({ name: "",category_id:"",brand_id:"", price: "", description: "", images: [], image_urls: [] });
      setIsModalOpen(false);
      alert("đã thêm thành công");
    } catch (error) {
      alert("Lỗi thêm sản phẩm:", error);
    }
  };
  // update
  const handleEditChange = (e)=> {
    setFormedit({...formedit,[e.target.name]: e.target.value});
  }
  const handleFileditChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setFormedit({
      ...formedit,
      images: files,  // Lưu các tệp ảnh vào state
      image_urls: imageUrls, // Lưu URL tạm thời để hiển thị ảnh
    });
  };
  const updateProduct= async (e)=> {
    e.preventDefault();
    try {
    const form = new FormData();
    form.append("name", formedit.name);
    form.append("category_id", formedit.category_id);
    form.append("brand_id", formedit.brand_id);
    form.append("price", formedit.price);
    form.append("description", formedit.description);

    // Thêm từng file ảnh vào form
    formedit.images.forEach((image, index) => {
      form.append(`images[${index}]`, image);
    });
    const response = await axios.post(`http://localhost:8000/home/updateProduct/${formedit.id}`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });    
    alert(response.data.message || "Cập nhật sản phẩm thành công!");
    fetchAdmin();
    resetEditForm();
    
  }
  catch {
    alert("không thể cập nhật");
  }
}
  const editproduct =(product) => {
    setFormedit({
      id: product.id,
      name: product.name,
      category_id: product.category_id,
      brand_id: product.brand_id,
      price: product.price,
      description: product.description || "",
      images: [],
      image_urls: product.car_image.map((img) => `http://localhost:8000/${img.image_url}`),
    })
  }
  const resetEditForm=()=> {
    setFormedit({ name: "",category_id:"",brand_id:"", price: "", description: "", images: [], image_urls: [] });
    setIsEditOpen(false);
  }
// delete
const deleteProduct = (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa sản phẩm này?")) {
      axios.delete(`http://localhost:8000/home/removecar/${id}`,  {headers: { Authorization: `Bearer ${token}` }},)
        .then(() => {
          alert("Sản phẩm đã được xóa thành công!");
          setData((prev) => ({
            ...prev,
            cars: prev.cars.filter((item)=> item.id !== id)  // Lọc các sản phẩm theo điều kiện
          }));
          
        })
        .catch(() => {
          console.log("xóa thất bại")
        })

    }
  };
  const deleteUser =(id)=> {
    if (window.confirm("Bạn chắc chắn muốn xóa sản phẩm này?")) {
      axios.delete(`http://localhost:8000/home/removeuser/${id}`, {headers: { Authorization: `Bearer ${token}` }},)
      .then(()=> {
        alert("đã xóa thành công người dùng");
        setData((prev)=> ({
          ...prev,users:prev.users.filter((item)=>item.id!==id)
        }));
      })
      .catch(()=>{
        alert("xóa thất bại");
      })
    }
  }
  const fetchOrder= async ()=> {
    const token = localStorage.getItem("token")
    try {
      const response = await axios.get('http://localhost:8000/home/getorder',{headers:{Authorization: `Bearer ${token}`}})
      setOrders(response.data.orders);
      console.log("dữ liệu order",response.data.orders);
    } catch (error) {
      console.log("không thể lấy dữ liệu của order")
    }
  }
  const updateOrderStatus=(orderId,newState) => {
    const token = localStorage.getItem("token")
    try {
      axios.post(`http://localhost:8000/home/postorder/${orderId}`,{ status: newState },{headers:{Authorization: `Bearer ${token}`}})
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newState } : order
        )
      );
      alert(`Đơn hàng #${orderId} đã được cập nhật thành "${newState}"`);
    } catch (error) {
      console.log("có lỗi khi thực hiện");
    }
  }
  return (
    <div>

    <div className="flex h-screen bg-gray-100 p-6">
      {/* Danh sách User */}
      <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg mr-4">
        <h3 className="text-xl font-bold mb-4">Danh sách User</h3>
        <h1 className="text-3xl mb-5 text-red-500">Có {data.users.length} người dùng</h1>
        <ul>
          {data.users.map((user) => (
            <li key={user.id} className="flex justify-between p-2 border-b">
              {user.name} - {user.email}
              <button onClick={()=>deleteUser(user.id)} className="bg-red-500 text-white px-2 py-1 rounded">Xóa</button>
            </li>
          ))}
        </ul>
      </div>
      
     {/* Danh sách Sản phẩm */}
<div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-xl font-bold">Danh sách Sản phẩm</h3>
    <button 
      onClick={() => setIsModalOpen(true)} 
      className="bg-blue-500 text-white px-4 py-2 rounded">
      + Thêm sản phẩm
    </button>

  </div>
          <h1 className="text-3xl mb-5 text-sky-500">Có {data.cars.length} sản phẩm</h1>
  {/* Vùng cuộn */}
  <div className="max-h-96 overflow-y-auto">
    <ul>
      {data.cars.map((product) => (
        <li key={product.id} className="flex justify-between p-2 border-b items-center">
          <img src={`http://localhost:8000/${product.car_image[0].image_url}`} 
               alt={product.name} 
               className="w-12 h-12 object-cover rounded" />
          <span>{product.name} - {product.price.toLocaleString()}$</span>
          <button
                    onClick={() => {editproduct(product);setIsEditOpen(true)}}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Sửa
                  </button>
          <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={()=>deleteProduct(product.id)}>Xóa</button>
        </li>
      ))}
    </ul>
  </div>
</div>



      {/* Modal thêm sản phẩm */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
    <h3 className="text-xl font-bold mb-4">Thêm sản phẩm</h3>
    <form onSubmit={addProduct}>
      <input
        type="text"
        name="name"
        placeholder="Tên sản phẩm"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
        required
      />
            {/* Thêm trường Category */}
            <select
        name="category_id"
        value={form.category_id}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
        required
      >
        <option value="">Chọn danh mục</option>
        {/* Thêm các danh mục ở đây */}
        {data.categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Thêm trường Brand */}
      <select
        name="brand_id"
        value={form.brand_id}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
        required
      >
        <option value="">Chọn thương hiệu</option>
        {/* Thêm các thương hiệu ở đây */}
        {data.brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="price"
        placeholder="Giá"
        value={form.price}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Mô tả"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      />


      {/* Thêm trường Ảnh */}
      <input
        type="file"
        name="images"
        onChange={handleFileChange}
        className="w-full p-2 mb-2 border rounded"
        multiple
      />
      {/* Hiển thị ảnh đã chọn */}
<div className="flex gap-2 mt-2">
  {form.image_urls?.map((image, index) => (
    <img key={index} src={image} alt={`Preview ${index}`} className="w-16 h-16 object-cover rounded border" />
  ))}
</div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsModalOpen(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Thêm
        </button>
      </div>
    </form>
  </div>
</div>
      )}
      {/* Modal Sửa sản phẩm */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Sửa sản phẩm</h3>
            {/* {errorMessage && <p className="text-red-500 mb-4 whitespace-pre-line">{errorMessage}</p>} */}
            <form onSubmit={updateProduct}>
              <input
                type="text"
                name="name"
                placeholder="Tên sản phẩm"
                value={formedit.name}
                onChange={handleEditChange}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <select
                name="category_id"
                value={formedit.category_id}
                onChange={handleEditChange}
                className="w-full p-2 mb-2 border rounded"
                required
              >
                <option value="">Chọn danh mục</option>
                {data.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                name="brand_id"
                value={formedit.brand_id}
                onChange={handleEditChange}
                className="w-full p-2 mb-2 border rounded"
                required
              >
                <option value="">Chọn thương hiệu</option>
                {data.brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="price"
                placeholder="Giá"
                value={formedit.price}
                onChange={handleEditChange}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <textarea
                name="description"
                placeholder="Mô tả"
                value={formedit.description}
                onChange={handleEditChange}
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="file"
                name="images"
                onChange={handleFileditChange}
                className="w-full p-2 mb-2 border rounded"
                multiple
              />
              <div className="flex gap-2 mt-2">
                {formedit.image_urls.map((image, index) => (
                  <img key={index} src={image} alt={`Preview ${index}`} className="w-16 h-16 object-cover rounded border" />
                ))}
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={resetEditForm} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
                  Hủy
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
        
      )}
    </div>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Quản lý đơn hàng</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Mã đơn</th>
              <th className="border p-2">Khách hàng</th>
              <th className="border p-2">Tổng tiền</th>
              <th className="border p-2">Trạng thái</th>
              <th className="border p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center border-b">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.user.name}</td>
                <td className="p-2">{order.total_price.toLocaleString()}đ</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      order.status === "pending"
                        ? "bg-yellow-400"
                        : order.status === "shipped"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-2 flex justify-center space-x-2">
                  
                  <button
                  onClick={() => updateOrderStatus(order.id, "shipped")}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                    Hoàn thành
                  </button>
                    
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => updateOrderStatus(order.id, "canceled")}
                  >
                    Hủy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    
  );
};


export default DashBoard;
