import { PropsWithChildren, createContext, useContext, useState } from 'react';

export interface TablesState {
    userFetchOffset: number;
    setUserFetchOffset: (isLoggedIn: number) => void;
}

export const TablesStateContext = createContext<TablesState | undefined>(
    undefined
);

export const useTablesStateContext = () => {
    const tablesStateContext = useContext(TablesStateContext);

    if (!tablesStateContext)
        throw new Error(
            'No TablesStateContext.Provider found when calling useTablesStateContext.'
        );

    return tablesStateContext;
};

export const TablesStateProvider = ({ children }: PropsWithChildren) => {
    const [userFetchOffset, setUserFetchOffset] = useState(0);

    return (
        <TablesStateContext.Provider
            value={{ userFetchOffset, setUserFetchOffset }}
        >
            {children}
        </TablesStateContext.Provider>
    );
};
