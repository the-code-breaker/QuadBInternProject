import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CartItem from '../Component/CartItem';
import Navbar from '../Component/Navbar';
import { ProductState } from '../Context/context';
import Login from '../Component/Login';
const Cart = () => {
    const [items, setItems] = useState([]);
    const { user, cart, setCart, products, setProducts } = ProductState();
    const currentUser = user?.user;
    const fetchCartData = async () => {
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
        setItems(response.data.items);
    }
    useEffect(()=>{
        fetchCartData();
    },[])

    if(!currentUser){
      return <Login/>;
    }

  return (

    <>
    <Navbar/>
        <h1 style={{textAlign:"center"}}>Cart</h1>
        {items.length === 0 ? <h1 style={{textAlign:"center"}}>Cart is Empty add Items to cart</h1> :
            items.map((e)=>(
                <CartItem key={e._id} value={e}/>
            ))
        }
    </>
  )
}

export default Cart