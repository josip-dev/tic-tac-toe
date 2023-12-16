import { useEffect } from 'react';
import { useUserStateContext } from '../state/UserState';
import { useNavigate } from 'react-router-dom';

const PlayerRanking = () => {
    const { loginData } = useUserStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loginData) {
            navigate('/login');
        }
    }, [loginData, navigate]);

    return (
        <>
            <h2>Player Ranking</h2>
        </>
    );
};

export default PlayerRanking;
