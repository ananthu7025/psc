import { Outlet, Navigate } from 'react-router-dom';
import { useGetUserDetailsQuery } from '../api/modules/login';

const PrivateRoutes = () => {
  const token = localStorage.getItem('storage_Key');
  const isAuthenticated = token && typeof token === 'string';
  const { data: user } = useGetUserDetailsQuery();
  const isUserPaid = user?.isPaid;
  return isAuthenticated && isUserPaid ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;
