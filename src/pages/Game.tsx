import { useParams } from 'react-router-dom';
import useApiRequest from '../hooks/use-api-request';
import { Game as GameModel } from '../models/game';
import { useEffect } from 'react';
import BoardRow from '../components/BoardRow';
import { useUserStateContext } from '../state/UserState';
import { ApiMethod } from '../constants/api-method';
import ErrorMessage from '../components/ErrorMessage';
import { cn } from '../utilities/class-name-utilities';
import { IconCircle, IconCrown, IconX } from '@tabler/icons-react';
import { User } from '../models/user';

const Game = () => {
    const { gameId } = useParams();
    const { user } = useUserStateContext();
    const {
        performApiRequest: fetchGame,
        data: game,
        error: fetchGameError,
    } = useApiRequest<GameModel>(`games/${gameId}`);
    const {
        performApiRequest: makeMove,
        error: makeMoveError,
        loading,
    } = useApiRequest(`games/${gameId}/move`, ApiMethod.Post);

    useEffect(() => {
        fetchGame();

        const interval = setInterval(fetchGame, 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!user) {
        return null;
    }

    if (fetchGameError) {
        const is404 = fetchGameError.includes('404');

        return (
            <ErrorMessage
                header={
                    is404
                        ? `The game wasn't found`
                        : 'There was a problem fetching the game'
                }
                error={fetchGameError}
                handled={is404}
            />
        );
    }

    if (!game) {
        return <ErrorMessage error="There was an error fetching the game..." />;
    }

    const { first_player, second_player, winner, board } = game;

    let count = 0;
    board.forEach((row) => {
        row.forEach((sign) => {
            if (sign) {
                count++;
            }
        });
    });

    const isFirstPlayersTurn = count % 2 === 0;
    const isReadonly =
        (first_player.id !== user.id && second_player?.id !== user.id) ||
        !!winner;

    const playerDisplay = (
        hasCurrentTurn: boolean,
        icon: JSX.Element,
        player?: User
    ) => {
        if (!player) {
            return <div>Waiting for second player to join...</div>;
        }

        return (
            <div className="font-semibold text-lg">
                <div className="flex flex-col items-center">
                    {winner?.id === player.id && <IconCrown size={30} />}
                    <div className="flex gap-2 items-center">
                        <span
                            className={
                                !isReadonly && hasCurrentTurn ? 'text-3xl' : ''
                            }
                        >
                            {player.username}
                        </span>
                        {player.id === user.id ? ` (You)` : ''}
                    </div>
                    {icon}
                </div>
            </div>
        );
    };

    return (
        <div
            className={cn(
                'flex flex-col justify-center items-center mx-auto w-[600px] text-cyan-700',
                isReadonly ? 'pointer-events-none opacity-80' : ''
            )}
        >
            <ErrorMessage
                header="There was a problem trying to make a move"
                error={makeMoveError}
                classes="mb-6"
            />

            {loading && <div>Submitting the move...</div>}

            <div className="w-full flex justify-between items-center">
                {playerDisplay(
                    isFirstPlayersTurn,
                    <IconCircle size={16} />,
                    first_player
                )}
                <div className="font-semibold text-lg">VS</div>
                {playerDisplay(
                    !isFirstPlayersTurn,
                    <IconX size={16} />,
                    second_player
                )}
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
