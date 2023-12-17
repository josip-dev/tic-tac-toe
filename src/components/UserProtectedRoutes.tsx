import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { StorageKey } from '../constants/storage-key';

const UserProtectedRoutes = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem(StorageKey.Token);
        if (!token) {
            navigate('/login');
        }
    }, [location, navigate]);

    return localStorage.getItem(StorageKey.Token) && <Outlet />;
};

export default UserProtectedRoutes;
