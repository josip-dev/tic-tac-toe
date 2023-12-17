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
// import CheckBox from '../components/CheckBox';
import { IconChartBar, IconEye, IconPlayerPlay } from '@tabler/icons-react';
import Button from '../components/Button';
import InputField from '../components/InputField';

const GAME_FETCH_LIMIT = 10;

const GameList = () => {
    const { gameFetchOffset, setGameFetchOffset } = useTablesStateContext();
    const { performApiRequest: fetchGames, data: games } =
        useApiRequest<PaginatedResponse<Game>>('games');

    const [statusFilter, setStatusFilter] = useState<GameStatus | undefined>();
    // const [filterOpenGames, setFilterOpenGames] = useState(true);
    // const [filterInProgressGames, setFilterInProgressGames] = useState(true);
    // const [filterFinishedGames, setFilterFinishedGames] = useState(true);

    useEffect(() => {
        fetchGames({
            limit: GAME_FETCH_LIMIT,
            offset: gameFetchOffset,
            status: statusFilter,
            // status: [
            //     filterOpenGames && GameStatus.Open,
            //     filterInProgressGames && GameStatus.InProgress,
            //     filterFinishedGames && GameStatus.Finished,
            // ].filter(Boolean),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        gameFetchOffset,
        statusFilter,
        // filterOpenGames,
        // filterInProgressGames,
        // filterFinishedGames,
    ]);

    return (
        <>
            <h2 className="text-3xl font-semibold text-cyan-950 mb-2">
                Game List
            </h2>

            <div className="flex justify-between items-center mb-4">
                {/* <fieldset className="w-fit border border-solid border-cyan-800 px-5 py-3">
                    <legend className="text-sm px-2">Status</legend>

                    <div className="flex gap-3 items-center">
                        <CheckBox
                            name="open"
                            value={GameStatus.Open}
                            label={getGameStatusString(GameStatus.Open)}
                            isChecked={filterOpenGames}
                            setIsChecked={setFilterOpenGames}
                        />
                        <CheckBox
                            name="progress"
                            value={GameStatus.InProgress}
                            label={getGameStatusString(GameStatus.InProgress)}
                            isChecked={filterInProgressGames}
                            setIsChecked={setFilterInProgressGames}
                        />
                        <CheckBox
                            name="finished"
                            value={GameStatus.Finished}
                            label={getGameStatusString(GameStatus.Finished)}
                            isChecked={filterFinishedGames}
                            setIsChecked={setFilterFinishedGames}
                        />
                    </div>
                </fieldset> */}
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

                <Button className="w-auto h-fit">Start New Game</Button>
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
                                    {first_player.username}
                                </span>
                                <span>VS</span>
                                <span className="font-semibold">
                                    {second_player.username}
                                </span>
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
                        render: ({ status }) => (
                            <div className="flex items-center gap-2">
                                {status === GameStatus.Finished ? (
                                    <Button
                                        icon={<IconChartBar />}
                                        title="View Statistics"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Button
                                            icon={<IconPlayerPlay />}
                                            title={
                                                status === GameStatus.InProgress
                                                    ? 'Resume'
                                                    : 'Play'
                                            }
                                        />

                                        <Button
                                            icon={<IconEye />}
                                            title="Spectate"
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
