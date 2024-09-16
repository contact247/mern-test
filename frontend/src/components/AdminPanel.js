import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavComponent from './NavComponent';

const AdminPanel = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Load the username from local storage/session storage after login
  useEffect(() => {
    const storedUsername = localStorage.getItem('username'); // or sessionStorage
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      // If no username, redirect to login
      navigate('/');   
    }
  }, [navigate]);

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('username'); // Clear username from storage
    // If using JWT, remove the token too
    localStorage.removeItem('token'); // or sessionStorage
    navigate('/'); // Redirect to login
  };

  return (
    <div>
        <NavComponent/>
      <h1 style={styles.h1}>Welcome to Admin Panel</h1>
    </div>
  );
};

const styles = {
    h1:{
        display:'flex',
        justifyContent: 'space-around',
        alignItem:'center',
    }
}

export default AdminPanel;
