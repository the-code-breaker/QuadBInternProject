import React, { useEffect, useState } from 'react'
import Register from '../Component/Register'
import { useNavigate } from "react-router-dom";
import Navbar from '../Component/Navbar';
import Product from './Products';
import Login from '../Component/Login';
import Footer from './Footer';

const Home = () => {
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
    },[])
    if (!user) return <Login/>;
  return (
    <>
    <Navbar/>
    <Product/>
    <Footer/>
    </>
  )
}

export default Home