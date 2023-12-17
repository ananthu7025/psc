import { Outlet, Navigate } from 'react-router-dom';
import { useGetUserDetailsQuery } from '../api/modules/login';

const PrivateRoutes = () => {
  const token = localStorage.getItem('storage_Key');
  const isPaid = localStorage.getItem('Paid');
  const isAuthenticated = token && typeof token === 'string';

  // Check if user details are still loading
  // if (isLoading) {
  //   return  <div style={{ display: "flex", justifyContent: "center", marginLeft: "280px", marginBottom: "100px", textAlign: "center" }}>
  //   <span className="loader"></span>
  // </div>;
  // }
  

  return isAuthenticated && isPaid === 'true' ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;
