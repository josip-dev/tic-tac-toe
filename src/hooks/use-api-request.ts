import { useState } from 'react';
import { ApiMethod } from '../constants/api-method';
import { useUserStateContext } from '../state/UserState';

const API_BASE_ROUTE = 'https://tictactoe.aboutdream.io';

const useApiRequest = <T = undefined>(
    route: string,
    method: ApiMethod = ApiMethod.Get
) => {
    const [data, setData] = useState<T | undefined>();
    const [error, setError] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);
    const { user } = useUserStateContext();

    const performApiRequest = async (
        payload?: unknown,
        routeParameters?: Record<string, unknown>
    ): Promise<T | undefined> => {
        setLoading(true);
        setError(undefined);

        try {
            let endpoint = route.endsWith('/') ? route : `${route}/`;

            if (routeParameters) {
                Object.keys(routeParameters).forEach((routeParameterName) => {
                    const routeParameterValue =
                        routeParameters[routeParameterName];
                    const valueAsString =
                        typeof routeParameterValue === 'object'
                            ? JSON.stringify(routeParameterValue)
                            : String(routeParameterValue);
                    const routeParameterTemplate = `{{${routeParameterName}}}`;
                    endpoint = endpoint.replace(
                        routeParameterTemplate,
                        valueAsString
                    );
                });
            }

            let url = new URL(endpoint, API_BASE_ROUTE).toString();

            const requestData: RequestInit = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...(user?.token && {
                        Authorization: `Bearer ${user.token}`,
                    }),
                },
            };

            if (payload) {
                switch (method) {
                    case ApiMethod.Get: {
                        if (typeof payload !== 'object') {
                            break;
                        }

                        const parameters: Record<string, string> = {};

                        for (const parameterName in payload) {
                            const value = (payload as Record<string, unknown>)[
                                parameterName
                            ];
                            if (!value) {
                                continue;
                            }
                            parameters[parameterName] = String(value);
                        }
                        const queryParameters = new URLSearchParams(parameters);
                        url += `?${queryParameters}`;
                        break;
                    }

                    default:
                        requestData.body = JSON.stringify(payload);
                        break;
                }
            }

            const response = await fetch(url, requestData);

            if (!response.ok) {
                try {
                    const text = await response.text();
                    const {
                        errors,
                    }: {
                        errors: [
                            { path: string; code: string; message: string }
                        ];
                    } = JSON.parse(text);
                    setError(errors.map((error) => error.message).join(', '));
                } catch {
                    setError(
                        `API request failed: ${response.status} - ${response.statusText}`
                    );
                }
            }
            // 204: no content
            else if (response.status !== 204) {
                const responseText = await response.text();
                if (responseText.length > 0) {
                    const responseData = JSON.parse(responseText) as T;
                    setData(responseData);
                    return responseData;
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(String(error));
            }
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, performApiRequest };
};

export default useApiRequest;
