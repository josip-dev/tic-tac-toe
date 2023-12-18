import { useEffect } from 'react';
import useApiRequest from '../hooks/use-api-request';
import { PaginatedResponse } from '../models/paginated-response';
import { UserData } from '../models/user';
import Table from '../components/Table';
import { useTablesStateContext } from '../state/TablesState';

const USER_FETCH_LIMIT = 10;

const PlayerRanking = () => {
    const { userFetchOffset, setUserFetchOffset } = useTablesStateContext();
    const { performApiRequest: fetchUsers, data: users } =
        useApiRequest<PaginatedResponse<UserData>>('users');

    useEffect(() => {
        fetchUsers({
            limit: USER_FETCH_LIMIT,
            offset: userFetchOffset,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userFetchOffset]);

    return (
        <>
            <h2 className="text-3xl font-semibold text-cyan-800 mb-2">
                Player Ranking
            </h2>

            <Table
                data={users}
                itemsPerPage={USER_FETCH_LIMIT}
                dataOffset={userFetchOffset}
                setDataOffset={setUserFetchOffset}
                columns={[
                    {
                        header: 'Username',
                        property: 'username',
                    },
                    {
                        header: 'Game Count',
                        property: 'game_count',
                    },
                    {
                        header: 'Win Rate',
                        property: 'win_rate',
                        render: (user) =>
                            `${Math.round(user.win_rate * 10000) / 100}%`,
                    },
                ]}
                keySelector={(user) => user.id}
            />
        </>
    );
};

export default PlayerRanking;
