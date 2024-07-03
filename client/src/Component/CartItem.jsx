import React from 'react'
import axios from 'axios'
import "./style.css"
const CartItem = ({value}) => {
    const handleRemoveItem = async (productId) => {
        console.log(productId)
        try {
            const data = JSON.parse(localStorage.getItem('userInfo')); 
            const token = data?.token;
            const response = await axios.delete(
              `http://localhost:5000/api/cart/${productId}`,
              {
                headers: {
                  'Authorization': token,
                  'Content-Type': 'application/json',
                },
              }
            );
            window.location.reload();
          } catch (error) {
            console.error('Error adding item to cart:', error);
          }
    }
  return (
    <>
        <div className='productList'>
        <div className='productBox'>
        <h1>{value?.product?.name}</h1>
        <p>{value?.product?.description}</p>
        <h4>{value?.product?.price}</h4>
        <p>{value?.product?.category}</p>
        <button onClick={()=>{handleRemoveItem(value._id)}}>Remove</button>
    </div>
        </div>
    </>
  )
}

export default CartItem