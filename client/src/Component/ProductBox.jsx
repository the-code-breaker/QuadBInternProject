import React, { useState } from 'react';
import axios from 'axios';
import { ProductState } from '../Context/context';
import './style.css'; // Import CSS file
import config from '../config/config';
const serverApi = config.serverApi;
const ProductBox = ({ value }) => {
  const { user,cart,setCart, products, setProducts } = ProductState();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    name: value.name,
    description: value.description,
    price: value.price,
    category: value.category,
  });

  const handleAddItem = async (productId) => {
    try {
      const data = JSON.parse(localStorage.getItem('userInfo')); 
      const token = data?.token;
      const response = await axios.post(
        `${serverApi}/cart`, 
        { productId },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }

      );
      setCart(response?.data)
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const data = JSON.parse(localStorage.getItem('userInfo'));
  const admin = data?.user?.isAdmin;
  const token = data?.token;

  const handleRemove = async (productId) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: token,
      };

      const response = await axios.delete(`${serverApi}/products/${productId}`, {
        headers: headers,
      });
      const filterData = products.filter((e) => e._id !== productId);
      setProducts(filterData);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('userInfo'));
      const token = data?.token;
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };

      const response = await axios.put(
        `${serverApi}/products/${value._id}`,
        editedProduct,
        {
          headers: headers,
        }
      );

      console.log('Product updated:', response.data);

      const updatedProducts = products.map((product) =>
        product._id === value._id ? response.data : product
      );
      setProducts(updatedProducts);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };



  return (
    <div className='productBox'>
      {isEditing ? (
        <div className='edit-form'>
          <input
            type='text'
            name='name'
            value={editedProduct.name}
            onChange={handleChange}
          />
          <textarea
            name='description'
            value={editedProduct.description}
            onChange={handleChange}
          />
          <input
            type='number'
            name='price'
            value={editedProduct.price}
            onChange={handleChange}
          />
          <input
            type='text'
            name='category'
            value={editedProduct.category}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Save</button>
        </div>
      ) : (
        <>
          <h1>{value.name}</h1>
          <p>Description: {value.description}</p>
          <h4>Price: ₹ {value.price}</h4>
          <p>Category: {value.category}</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {admin === true && (
              <button onClick={() => handleRemove(value._id)}>Remove Product</button>
            )}
            {admin === true && (
              <button onClick={() => handleEdit(value._id)}>Edit Product Details</button>
            )}
            <button onClick={() => handleAddItem(value._id)}>Add To Cart</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductBox;
