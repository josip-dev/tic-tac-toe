import { PropsWithChildren, createContext, useContext } from 'react';
import { StorageKey } from '../constants/storage-key';
import { usePersistedState } from '../hooks/use-persisted-state';
import { UserLoginData } from '../models/user';

export interface UserState {
    user?: UserLoginData;
    setUser: React.Dispatch<React.SetStateAction<UserLoginData | undefined>>;
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
    const [user, setUser] = usePersistedState<UserLoginData>(StorageKey.User);

    return (
        <UserStateContext.Provider value={{ user, setUser }}>
            {children}
        </UserStateContext.Provider>
    );
};
