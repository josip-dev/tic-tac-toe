import { PropsWithChildren, createContext, useContext, useState } from 'react';

export interface UserState {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
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
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <UserStateContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserStateContext.Provider>
    );
};
