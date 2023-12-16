const API_BASE_ROUTE = 'https://tictactoe.aboutdream.io';

export const makeApiRequest = async (
    route: string,
    requestData: RequestInit,
    token?: string
) => {
    const url = new URL(
        route.endsWith('/') ? route : `${route}/`,
        API_BASE_ROUTE
    );

    let headers = requestData.headers || {};
    if (requestData.body) {
        headers = {
            'Content-Type': 'application/json',
            ...headers,
        };
    }
    if (token) {
        headers = {
            Authorization: `Bearer ${token}`,
            ...headers,
        };
    }
    requestData.headers = headers;

    const response = await fetch(url, requestData);

    try {
        const data = await response.json();
        return data;
    } catch {
        // there is no JSON in the response
    }
};

export const makeApiPostRequest = async (
    route: string,
    body?: unknown,
    token?: string,
    otherRequestData?: RequestInit
) => {
    const data = await makeApiRequest(
        route,
        {
            ...otherRequestData,
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
        },
        token
    );
    return data;
};
