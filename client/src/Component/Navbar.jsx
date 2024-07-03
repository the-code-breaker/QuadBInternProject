import React from 'react';
import { ProductState } from '../Context/context';
import './style.css'; // Import CSS file
import { Link } from 'react-router-dom';
import profile from '../assets/profile.png';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, cart } = ProductState();
  const currenUser = user?.user;
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.reload();
  };

  return (
    <div className='navbar'>
      <Link to='/' className='navbar-heading'>
        <img src={logo} alt='' width={70} />
        <h1>Tech Space</h1>
      </Link>
      <div className='navList'>
        <Link to='/' style={{all:"unset"}}><p>Home</p></Link>
        <Link to='/cart' style={{all:"unset", cursor:"pointer"}}>Cart ({cart?.items?.length})</Link>
        {currenUser?.isAdmin === true && <Link to='/admin' style={{all:"unset"}}><p>Admin Panel</p></Link>}
        {currenUser?.username && (
          <>
            <img src={profile} alt='Profile' width={40} />
            <h2>{currenUser?.username}</h2>
          </>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
