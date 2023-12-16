import { ApiMethod } from '../constants/api-method';
import useApiRequest from '../hooks/use-api-request';
import { useUserStateContext } from '../state/UserState';
import NavigationButton from './NavigationButton';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
    const { loginData, setLoginData } = useUserStateContext();
    const navigate = useNavigate();
    const { performApiRequest: logOut } = useApiRequest(
        'logout',
        ApiMethod.Post
    );

    return (
        <nav className="flex justify-between">
            <ul className="flex gap-4">
                <li>
                    <NavigationButton destination="/game-list">
                        Game List
                    </NavigationButton>
                </li>
                <li>
                    <NavigationButton destination="/player-ranking">
                        Player Ranking
                    </NavigationButton>
                </li>
            </ul>

            {!loginData ? (
                <ul className="flex gap-4">
                    <li>
                        <NavigationButton destination="/login">
                            Log In
                        </NavigationButton>
                    </li>
                    <li>
                        <NavigationButton destination="/register">
                            Register
                        </NavigationButton>
                    </li>
                </ul>
            ) : (
                <button
                    className="w-[100px]"
                    onClick={async () => {
                        await logOut();
                        setLoginData(undefined);
                        navigate('/login');
                    }}
                >
                    Log Out
                </button>
            )}
        </nav>
    );
};

export default NavigationBar;
