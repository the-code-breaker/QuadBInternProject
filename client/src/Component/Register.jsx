// Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import './style.css'; // Import CSS file
import Home from '../pages/Home';
import { ProductState } from '../Context/context';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user } = ProductState();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username: username,
        password: password
      });

      localStorage.setItem('userInfo', JSON.stringify(response.data)); // Store response.data
      setPassword('');
      setUsername('');
      toast('User Registered Successfully', {
        position: 'top-right'
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      console.error('Registration Error:', err);
      toast.error('Failed to register. Please try again.', {
        position: 'top-right'
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
  };

  if(user){
    return <Home/>
  }

  return (
    <div className="register-container">
      <h1>Register</h1>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
      <button onClick={handleSubmit}>Submit</button>
      <p>If already registered, <Link to="/">Login</Link> here.</p>
    </div>
  );
};

export default Register;
