import { useEffect } from 'react';
import { useUserStateContext } from '../state/UserState';
import { useNavigate, Outlet } from 'react-router-dom';

const UserProtectedRoutes = () => {
    const { loginData } = useUserStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loginData) {
            navigate('/login');
        }
    }, [loginData, navigate]);

    return <Outlet />;
};

export default UserProtectedRoutes;
