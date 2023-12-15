import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import GameList from './pages/GameList';
import PlayerRanking from './pages/PlayerRanking';
import NavigationBar from './components/NavigationBar';
import NotFound from './pages/NotFound';

const App = () => {
    return (
        <Router>
            <NavigationBar />

            <Routes>
                <Route path="/game-list" element={<GameList />} />
                <Route path="/player-ranking" element={<PlayerRanking />} />
                <Route path="/" element={<Navigate to="/game-list" />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
