import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useUserStateContext } from '../state/UserState';

const UserProtectedRoutes = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useUserStateContext();

    useEffect(() => {
        if (!user?.token) {
            navigate('/login');
        }
    }, [user, location, navigate]);

    return !!user?.token && <Outlet />;
};

export default UserProtectedRoutes;
