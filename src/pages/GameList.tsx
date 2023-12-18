import { useEffect, useState } from 'react';
import Table from '../components/Table';
import useApiRequest from '../hooks/use-api-request';
import { Game } from '../models/game';
import { PaginatedResponse } from '../models/paginated-response';
import { useTablesStateContext } from '../state/TablesState';
import {
    GAME_STATUS_DROPDOWN_OPTIONS,
    GAME_STATUS_DROPDOWN_OPTION_NONE,
    GameStatus,
    getGameStatusString,
} from '../constants/game-status';
import { IconChartBar, IconEye, IconPlayerPlay } from '@tabler/icons-react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { useUserStateContext } from '../state/UserState';
import { useNavigate } from 'react-router-dom';
import { ApiMethod } from '../constants/api-method';
import ErrorMessage from '../components/ErrorMessage';

const GAME_FETCH_LIMIT = 10;

const GameList = () => {
    const { gameFetchOffset, setGameFetchOffset } = useTablesStateContext();
    const { user } = useUserStateContext();
    const { performApiRequest: fetchGames, data: games } =
        useApiRequest<PaginatedResponse<Game>>('games');
    const { performApiRequest: createNewGame } = useApiRequest<Game>(
        'games',
        ApiMethod.Post
    );
    const { performApiRequest: joinExistingGame, error: joinGameError } =
        useApiRequest('games/{{gameId}}/join', ApiMethod.Post);
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState<GameStatus | undefined>();

    useEffect(() => {
        fetchGames({
            limit: GAME_FETCH_LIMIT,
            offset: gameFetchOffset,
            status: statusFilter,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameFetchOffset, statusFilter]);

    if (!user) {
        return null;
    }

    const startNewGame = async () => {
        const gameData = await createNewGame();
        if (!gameData) {
            return;
        }
        loadGame(gameData.id);
    };

    const joinGame = async (gameId: number) => {
        await joinExistingGame(undefined, {
            gameId,
        });
        loadGame(gameId);
    };

    const loadGame = (gameId: number) => {
        navigate(`/game/${gameId}`);
    };

    return (
        <>
            <h2 className="text-3xl font-semibold text-cyan-950 mb-2">
                Game List
            </h2>

            <ErrorMessage
                header="There was a problem trying to join a game"
                error={joinGameError}
                classes="mb-6"
            />

            <div className="flex justify-between items-center mb-4">
                <InputField
                    dropdownValues={GAME_STATUS_DROPDOWN_OPTIONS}
                    name="statusFilter"
                    label="Status"
                    value={statusFilter}
                    setValue={(valueToSet) =>
                        setStatusFilter(
                            valueToSet ===
                                GAME_STATUS_DROPDOWN_OPTION_NONE.value
                                ? undefined
                                : (valueToSet as GameStatus)
                        )
                    }
                />

                <Button className="w-auto h-fit" onClick={startNewGame}>
                    Start New Game
                </Button>
            </div>

            <Table
                data={games}
                itemsPerPage={GAME_FETCH_LIMIT}
                dataOffset={gameFetchOffset}
                setDataOffset={setGameFetchOffset}
                columns={[
                    {
                        header: 'Players',
                        render: ({ first_player, second_player }) => (
                            <div className="flex gap-2">
                                <span className="font-semibold">
                                    <span>{first_player.username}</span>
                                    {first_player.id === user.id && (
                                        <span className="ml-1 font-lg">
                                            (You)
                                        </span>
                                    )}
                                </span>
                                <span>VS</span>
                                <div>
                                    <span className="font-semibold">
                                        {second_player ? (
                                            <div>
                                                <span>
                                                    {second_player.username}
                                                </span>
                                                {second_player.id ===
                                                    user.id && (
                                                    <span className="ml-1 font-lg">
                                                        (You)
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <div>
                                                &lt;Waiting for second
                                                player...&gt;
                                            </div>
                                        )}
                                    </span>
                                </div>
                            </div>
                        ),
                    },
                    {
                        header: 'Status',
                        render: ({ status }) => (
                            <div className="font-semibold">
                                {getGameStatusString(status)}
                            </div>
                        ),
                    },
                    {
                        header: 'Actions',
                        render: ({
                            id,
                            status,
                            first_player,
                            second_player,
                        }) => (
                            <div className="flex items-center gap-2">
                                {status === GameStatus.Finished ? (
                                    <Button
                                        icon={<IconChartBar />}
                                        title="View Statistics"
                                        onClick={() => loadGame(id)}
                                    />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        {(status === GameStatus.Open ||
                                            first_player.id === user.id ||
                                            second_player?.id === user.id) && (
                                            <Button
                                                icon={<IconPlayerPlay />}
                                                title={
                                                    status ===
                                                    GameStatus.InProgress
                                                        ? 'Resume'
                                                        : 'Play'
                                                }
                                                onClick={() =>
                                                    status === GameStatus.Open
                                                        ? joinGame(id)
                                                        : loadGame(id)
                                                }
                                            />
                                        )}

                                        <Button
                                            icon={<IconEye />}
                                            title="Spectate"
                                            onClick={() => loadGame(id)}
                                        />
                                    </div>
                                )}
                            </div>
                        ),
                    },
                ]}
                keySelector={(game) => game.id}
            />
        </>
    );
};

export default GameList;
