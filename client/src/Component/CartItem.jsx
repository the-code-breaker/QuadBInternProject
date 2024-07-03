import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./style.css";
import config from '../config/config';
import { ProductState } from '../Context/context';

const serverApi = config.serverApi;

const CartItem = ({ value }) => {
  const { user, cart, setCart } = ProductState();
  const [currentCart, setCurrentCart] = useState([]);
  const handleRemoveItem = async (productId) => {
    try {
      const data = JSON.parse(localStorage.getItem('userInfo')); 
      const token = data?.token;
      const response = await axios.delete(
        `${serverApi}/cart/${productId}`,
        {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
        }
      );
      setCart(response.data); 
      window.location.reload();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className='productList'>
      <div className='productBox'>
      <h1>{value?.product?.name}</h1>
          <p>Description: {value?.product?.description}</p>
          <h4>Price: ₹ {value?.product?.price}</h4>
          <p>Category: {value?.product?.category}</p>
        <button onClick={() => { handleRemoveItem(value._id) }}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
