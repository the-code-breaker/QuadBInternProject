// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import './style.css'; // Import CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username: username,
        password: password
      });

      localStorage.setItem('userInfo', JSON.stringify(response.data)); // Store response.data
      setPassword('');
      setUsername('');
      toast('User Logged in Successfully', {
        position: 'top-right'
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      console.error('Login Error:', err);
      toast.error('Failed to login. Please check your credentials.', {
        position: 'top-right'
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
      <button onClick={handleLogin}>Login</button>
      <p>If not registered, <Link to="/register">Register</Link> first.</p>
    </div>
  );
};

export default Login;
