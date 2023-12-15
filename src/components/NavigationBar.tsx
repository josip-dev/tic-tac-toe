import { NavLink } from 'react-router-dom';
import { useUserStateContext } from '../state/UserState';

const NavigationBar = () => {
    const { isLoggedIn, setIsLoggedIn } = useUserStateContext();

    return (
        <nav>
            <ul>
                <li>
                    <NavLink
                        to="/game-list"
                        className={({ isActive }) =>
                            isActive ? 'text-violet-800' : ''
                        }
                    >
                        Game List
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/player-ranking"
                        className={({ isActive }) =>
                            isActive ? 'text-violet-800' : ''
                        }
                    >
                        Player Ranking
                    </NavLink>
                </li>
            </ul>
            <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
                {isLoggedIn ? 'Log Out' : 'Log In'}
            </button>
        </nav>
    );
};

export default NavigationBar;
