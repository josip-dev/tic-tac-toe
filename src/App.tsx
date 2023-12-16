import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import GameList from './pages/GameList';
import PlayerRanking from './pages/PlayerRanking';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProtectedRoutes from './components/UserProtectedRoutes';

const App = () => {
    return (
        <div className="p-4">
            <Router>
                <NavigationBar />

                <div className="container mx-auto">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route element={<UserProtectedRoutes />}>
                            <Route path="/game-list" element={<GameList />} />
                            <Route
                                path="/player-ranking"
                                element={<PlayerRanking />}
                            />
                        </Route>
                        <Route
                            path="/"
                            element={<Navigate to="/game-list" />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
};

export default App;
