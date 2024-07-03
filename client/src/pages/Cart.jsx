import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from '../Component/CartItem';
import Navbar from '../Component/Navbar';
import Login from '../Component/Login';
import { ProductState } from '../Context/context';
import config from '../config/config';
import './main.css'; // Import CSS file

const serverApi = config.serverApi;

const Cart = () => {
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState(0);
  const { user, cart, setCart, products, setProducts } = ProductState();
  const currentUser = user?.user;

  const fetchCartData = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('userInfo')); // Assuming you have a token stored after login
      const token = data?.token;
      const response = await axios.get(
        `${serverApi}/cart`,
        {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
        }
      );
      setItems(response?.data?.items);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalPrice = items.reduce((acc, item) => {
        return acc + item?.product?.price * item?.quantity;
      }, 0);
      setPrice(totalPrice);
    };
    calculateTotalPrice();
  }, [items]);

  if (!currentUser) {
    return <Login />;
  }

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h1 className="cart-title">Cart</h1>
        <div>
          {items.length === 0 ? <h1 className="cart-message">Cart is Empty add Items to cart</h1> :
            items.map((e) => {
              return <CartItem key={e._id} value={e} />;
            })
          }
        </div>
        <div className="total-container">
          <h2 className="total-title">Grand Total</h2>
          <h1 className="total-price">₹ {price}</h1>
          <button className="checkout-button">Proceed to Checkout</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
