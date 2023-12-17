import { ApiMethod } from '../constants/api-method';
import { StorageKey } from '../constants/storage-key';
import useApiRequest from '../hooks/use-api-request';
import { useUserStateContext } from '../state/UserState';
import Button from './Button';
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
        <nav className="flex justify-between items-center mb-3">
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
                <Button
                    secondary
                    onClick={async () => {
                        await logOut();
                        setIsLoggedIn(false);
                        localStorage.removeItem(StorageKey.Token);
                        navigate('/login');
                    }}
                >
                    Log Out
                </Button>
            )}
        </nav>
    );
};

export default NavigationBar;
