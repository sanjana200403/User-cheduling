import React from 'react';
import './HomePage.css'; // Make sure to import the CSS file
import Navbar from './Components/Navbar';
import UserList from './Components/UserList';

const HomePage = () => {
  return (
    <div>

  <Navbar/>
  <UserList/>
    </div>
  );
};

export default HomePage;
