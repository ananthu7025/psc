import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import UserLayout from './UserLayout';

const Home = () => {
  const user = {
    admin: false,
  };
  const userData = useSelector((state) => state.loginReducer?.userData);
  console.log(userData);
  return (
    <div>
      <Navbar />

      {user.admin ? (
        <div>Admin Panel</div>
      ) : (
        <UserLayout/>
      )}
       
    </div>
  );
};

export default Home;
