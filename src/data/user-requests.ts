import { UserLoginData } from '../models/user';
import { makeApiPostRequest } from './api-request';

export const register = async (username: string, password: string) => {
    await makeApiPostRequest('register', {
        username,
        password,
    });
};

export const logIn = async (username: string, password: string) => {
    const response = await makeApiPostRequest('login', {
        username,
        password,
    });

    return response as UserLoginData;
};

export const logOut = async (token: string) => {
    await makeApiPostRequest('logout', undefined, token);
};
