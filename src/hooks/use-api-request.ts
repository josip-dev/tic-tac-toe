import { useState } from 'react';
import { useUserStateContext } from '../state/UserState';
import { ApiMethod } from '../constants/api-method';

const API_BASE_ROUTE = 'https://tictactoe.aboutdream.io';

const useApiRequest = <T = undefined>(
    route: string,
    method: ApiMethod = ApiMethod.Get
) => {
    const [data, setData] = useState<T | undefined>();
    const [error, setError] = useState<Error | undefined>();
    const [loading, setLoading] = useState(false);
    const { loginData } = useUserStateContext();

    const performApiRequest = async (
        body?: unknown
    ): Promise<T | undefined> => {
        setLoading(true);
        setError(undefined);

        try {
            const url = new URL(
                route.endsWith('/') ? route : `${route}/`,
                API_BASE_ROUTE
            );

            const requestData: RequestInit = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...(loginData?.token && {
                        Authorization: `Bearer ${loginData.token}`,
                    }),
                },
            };

            if (body) {
                requestData.body = JSON.stringify(body);
            }

            const response = await fetch(url, requestData);

            if (!response.ok) {
                throw new Error(
                    `API request failed: ${response.status} - ${response.statusText}`
                );
            }

            // 204: no content
            if (response.status !== 204) {
                const responseData = await response.json();
                const dataCastToT = responseData as T;
                setData(dataCastToT);
                return dataCastToT;
            }
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, performApiRequest };
};

export default useApiRequest;
