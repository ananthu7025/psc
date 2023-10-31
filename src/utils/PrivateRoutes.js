import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const token = localStorage.getItem('storage_Key');
    const isAuthenticated = token && typeof token === 'string';
    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoutes;
