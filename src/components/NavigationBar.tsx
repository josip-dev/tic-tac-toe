import { ApiMethod } from '../constants/api-method';
import useApiRequest from '../hooks/use-api-request';
import { useUserStateContext } from '../state/UserState';
import Button from './Button';
import NavigationButton from './NavigationButton';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
    const { user, setUser } = useUserStateContext();
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

            {!user ? (
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
                <div className="flex items-center gap-4">
                    <div className="flex gap-1 items-center text-lg">
                        <span>Welcome back,</span>

                        <span className="font-semibold italic">
                            {user.username}
                        </span>
                    </div>
                    <Button
                        secondary
                        onClick={async () => {
                            await logOut();
                            setUser(undefined);
                            navigate('/login');
                        }}
                    >
                        Log Out
                    </Button>
                </div>
            )}
        </nav>
    );
};

export default NavigationBar;
