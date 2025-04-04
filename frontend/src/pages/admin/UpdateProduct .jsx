const UpdateProduct = ({ product, closeModal }) => {
    const [form, setForm] = useState(product);
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const updateProduct = () => {
      axios.post(`/api/products/update/${form.id}`, form)
        .then(() => {
          alert("Cập nhật thành công!");
          closeModal();
        })
        .catch(() => alert("Cập nhật thất bại!"));
    };
  
    return (
      <Modal>
        <input name="name" value={form.name} onChange={handleChange} />
        <button onClick={updateProduct}>Cập nhật</button>
        {/* Modal cập nhật sản phẩm */}
{isUpdateOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h3 className="text-xl font-bold mb-4">Cập nhật sản phẩm</h3>
      <form onSubmit={updateProduct}>
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />

        {/* Trường Category */}
        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
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

        {/* Trường Brand */}
        <select
          name="brand_id"
          value={form.brand_id}
          onChange={handleChange}
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

        {/* Hiển thị ảnh cũ */}
        <label>Ảnh hiện tại:</label>
        <div className="flex gap-2 mt-2">
          {form.old_images?.map((image, index) => (
            <img key={index} src={image} alt={`Ảnh ${index}`} className="w-16 h-16 object-cover rounded border" />
          ))}
        </div>

        {/* Chọn ảnh mới */}
        <input
          type="file"
          name="images"
          onChange={handleFileChange}
          className="w-full p-2 mb-2 border rounded"
          multiple
        />

        {/* Hiển thị ảnh mới đã chọn */}
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
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  </div>
)}
      </Modal>
    );
  };
  export default UpdateProduct;
  