import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './main.css';
import Navbar from '../Component/Navbar';
import config from '../config/config';
const serverApi = config.serverApi;
const AdminPanel = () => {
  const data = JSON.parse(localStorage.getItem('userInfo'));
  const admin = data?.user?.isAdmin;
  const token = data?.token;
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };

      const response = await axios.post(
        `${serverApi}/products`,
        newProduct,
        {
          headers: headers,
        }
      );

      toast.success('New Product Added Successfully', {
        position: 'top-right',
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      console.log('Product added:', response.data);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error Adding Product', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (!admin) {
    return <h1>You are not Authorized</h1>;
  }

  return (
    <>
    <Navbar/>
    <div className='container'>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Admin Panel - Add New Product
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Product Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={newProduct.name}
            onChange={handleChange}
            required
            />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description:</label>
          <textarea
            id='description'
            name='description'
            value={newProduct.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Price:</label>
          <input
            type='number'
            id='price'
            name='price'
            value={newProduct.price}
            onChange={handleChange}
            required
            />
        </div>
        <div className='form-group'>
          <label htmlFor='category'>Category:</label>
          <input
            type='text'
            id='category'
            name='category'
            value={newProduct.category}
            onChange={handleChange}
            required
            />
        </div>
        <div className='form-group'>
          <button type='submit'>Add Product</button>
        </div>
      </form>
    </div>
            </>
  );
};

export default AdminPanel;
