import { ApiMethod } from '../constants/api-method';
import { StorageKey } from '../constants/storage-key';
import useApiRequest from '../hooks/use-api-request';
import { useUserStateContext } from '../state/UserState';
import NavigationButton from './NavigationButton';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
    const { isLoggedIn, setIsLoggedIn } = useUserStateContext();
    const navigate = useNavigate();
    const { performApiRequest: logOut } = useApiRequest(
        'logout',
        ApiMethod.Post
    );

    return (
        <nav className="flex justify-between mb-2">
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

            {!isLoggedIn ? (
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
                        setIsLoggedIn(false);
                        localStorage.removeItem(StorageKey.Token);
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
