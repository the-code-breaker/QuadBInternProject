import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [cart, setCart] = useState();
    const [products, setProducts] = useState([]);
    const fetchData = async () =>{
      const res = await axios.get('http://localhost:5000/api/products');
      const data = JSON.parse(localStorage.getItem('userInfo')); // Assuming you have a token stored after login
            const token = data?.token;
            const response = await axios.get(
              'http://localhost:5000/api/cart',
              {
                headers: {
                  'Authorization': token,
                  'Content-Type': 'application/json',
                },
              }
            );
      setCart(response?.data);
      setProducts(res?.data);
    }
    useEffect(()=>{
      fetchData();
    },[])
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  },[])
  return (
    <ProductContext.Provider
      value={{
        user,
        cart,
        setCart,
        products, 
        setProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const ProductState = () => {
  return useContext(ProductContext);
};

export default ProductProvider;
