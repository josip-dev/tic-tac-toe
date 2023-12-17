import { useEffect, useState } from 'react';
import useApiRequest from '../hooks/use-api-request';
import { PaginatedResponse } from '../models/paginated-response';
import { User } from '../models/user';
import Table from '../components/Table';

const USER_FETCH_LIMIT = 10;

const PlayerRanking = () => {
    const [userFetchOffset, setUserFetchOffset] = useState(0);
    const { performApiRequest: fetchUsers, data: users } =
        useApiRequest<PaginatedResponse<User>>('users');

    useEffect(() => {
        fetchUsers({
            limit: USER_FETCH_LIMIT,
            offset: userFetchOffset,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userFetchOffset]);

    return (
        <>
            <h2 className="text-3xl font-semibold text-cyan-950 mb-2">
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
                    },
                ]}
                keySelector={(user) => user.id}
                itemDisplay={(user, column) => user[column]}
            />
        </>
    );
};

export default PlayerRanking;
