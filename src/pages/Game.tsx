import { useParams, useSearchParams } from 'react-router-dom';
import useApiRequest from '../hooks/use-api-request';
import { Game as GameModel } from '../models/game';
import { useEffect } from 'react';
import BoardRow from '../components/BoardRow';
import { useUserStateContext } from '../state/UserState';
import { ApiMethod } from '../constants/api-method';
import Error from '../components/Error';

const Game = () => {
    const { gameId } = useParams();
    const [searchParameters] = useSearchParams();
    const showStatistics = !!searchParameters.get('statistics');
    const { user } = useUserStateContext();
    const {
        performApiRequest: fetchGame,
        data: game,
        error,
    } = useApiRequest<GameModel>(`games/${gameId}`);
    const { performApiRequest: makeMove, error: makeMoveError } = useApiRequest(
        `games/${gameId}/move`,
        ApiMethod.Post
    );

    useEffect(() => {
        fetchGame();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!user) {
        return null;
    }

    if (error) {
        if (error.includes('404')) {
            return <div>The game wasn't found</div>;
        }

        return (
            <div>There was a problem with processing the request: {error}</div>
        );
    }

    if (showStatistics) {
        return (
            <div>
                <div>Statistics for game</div>
                <div>{JSON.stringify(game, null, 2)}</div>
            </div>
        );
    }

    if (!game) {
        return <div>There was an error fetching the game...</div>;
    }

    const { first_player, second_player, board } = game;

    let count = 0;
    board.forEach((row) => {
        row.forEach((sign) => {
            if (sign) {
                count++;
            }
        });
    });

    const isFirstPlayersTurn = count % 2 === 0;

    return (
        <div className="flex flex-col justify-center items-center mx-auto w-[600px] text-cyan-700">
            <Error
                header="There was a problem trying to make a move"
                error={makeMoveError}
                classes="mb-6"
            />

            <div className="w-full flex justify-between items-center">
                <div className="font-semibold text-lg">
                    <span className={isFirstPlayersTurn ? 'text-3xl' : ''}>
                        {first_player.username}
                    </span>
                    {first_player.id === user.id ? ` (You)` : ''}
                </div>
                <div className="font-semibold text-lg">VS</div>
                <div className="font-semibold text-lg">
                    <span className={!isFirstPlayersTurn ? 'text-3xl' : ''}>
                        {second_player.username}
                    </span>
                    {second_player.id === user.id ? ` (You)` : ''}
                </div>
            </div>

            <hr />

            <div className="text-cyan-600">
                {board.map((row, rowIndex) => {
                    return (
                        <BoardRow
                            key={`Row[${rowIndex}]`}
                            rowIndex={rowIndex}
                            row={row}
                            firstPlayerId={first_player.id}
                            makeMove={makeMove}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Game;
