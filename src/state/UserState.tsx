import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { UserLoginData } from '../models/user';

export interface UserState {
    loginData?: UserLoginData;
    setLoginData: (loginData?: UserLoginData) => void;
}

export const UserStateContext = createContext<UserState | undefined>(undefined);

export const useUserStateContext = () => {
    const userStateContext = useContext(UserStateContext);

    if (!userStateContext)
        throw new Error(
            'No UserStateContext.Provider found when calling useUserStateContext.'
        );

    return userStateContext;
};

export const UserStateProvider = ({ children }: PropsWithChildren) => {
    const [loginData, setLoginData] = useState<UserLoginData | undefined>();

    return (
        <UserStateContext.Provider value={{ loginData, setLoginData }}>
            {children}
        </UserStateContext.Provider>
    );
};
