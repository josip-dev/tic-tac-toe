import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export const usePersistedState = <T = undefined>(
    key: string,
    fallbackValue?: T
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] => {
    const readValue = () => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : fallbackValue;
        } catch {
            return fallbackValue;
        }
    };

    const [storedValue, setStoredValue] = useState(readValue);

    const setValue = (
        value: T | ((valueToSet: T | undefined) => T | undefined) | undefined
    ) => {
        try {
            if (!value) {
                localStorage.removeItem(key);
                setStoredValue(undefined);
            } else {
                const newValue =
                    value instanceof Function ? value(storedValue) : value;
                localStorage.setItem(key, JSON.stringify(newValue));
                setStoredValue(newValue);
            }

            dispatchEvent(new Event('local-storage'));
        } catch (error) {
            console.warn(`Error setting localStorage key “${key}”:`, error);
        }
    };

    useEffect(() => {
        const handleStorageChange = () => {
            setStoredValue(readValue());
        };

        // read initial value
        handleStorageChange();

        /*
         the ‘storage’ event is a built-in browser event that’s fired when a storage area (localStorage or sessionStorage)
         has been modified in the context of another document.
         the ‘storage’ event is not dispatched on the page that changed the storage.
         that’s why the custom ‘local-storage’ event is used to notify the current page of changes to the localStorage data.
        */
        addEventListener('storage', handleStorageChange);
        addEventListener('local-storage', handleStorageChange);

        return () => {
            removeEventListener('storage', handleStorageChange);
            removeEventListener('local-storage', handleStorageChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [storedValue, setValue];
};
