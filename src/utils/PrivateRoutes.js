import { Outlet, Navigate } from 'react-router-dom';
import { useGetUserDetailsQuery } from '../api/modules/login';

const PrivateRoutes = () => {
  const token = localStorage.getItem('storage_Key');
  const isAuthenticated = token && typeof token === 'string';
  const { data: user, isLoading } = useGetUserDetailsQuery();

  // Check if user details are still loading
  if (isLoading) {
    return  <div style={{ display: "flex", justifyContent: "center", marginLeft: "280px", marginBottom: "100px", textAlign: "center" }}>
    <span className="loader"></span>
  </div>;
  }

  // Assuming that if user details are not available, isUserPaid is false
  const isUserPaid = user?.isPaid || false;

  return isAuthenticated && isUserPaid ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;
