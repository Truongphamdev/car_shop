// src/context/CartContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);
export const CartProvider = ({children})=> {
    
    const [cart, setCart] = useState([]);
    const token = localStorage.getItem("token");
  
    // lấy tt giỏ hàng
    const fetchCart= async () => {
        try {
            if(!token) {
                return
            }
            const response = await axios.get("http://localhost:8000/home/cart",
                {headers: { Authorization: `Bearer ${token}` },}
            );
            const cartArray = Array.isArray(response.data.cart) ? response.data.cart : Object.values(response.data.cart);
            setCart(cartArray); // Cập nhật cartItems với dữ liệu từ server
            console.log("dữ liệu cart",response.data.cart)
        } catch (error) {
            console.error("Lỗi khi lấy giỏ hàng:", error);
        }
    }
    useEffect(() => {
      fetchCart();
    }, [token]);

  return (
    <CartContext.Provider value={{ cart, setCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
