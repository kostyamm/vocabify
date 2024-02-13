import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

export type SetValue<T> = Dispatch<SetStateAction<T>>

export const useLocalStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
    const getStorageValue = useCallback((): T => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? (parseJSON(item) as T) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key “${key}”:`, error);
            return initialValue;
        }
    }, [initialValue, key]);

    const [value, setValue] = useState<T>(getStorageValue);

    const updateValue: SetValue<T> = (value) => {
        if (value === null) {
            return removeKey(key)
        }

        try {
            window.localStorage.setItem(key, JSON.stringify(value));

            setValue(value);

            window.dispatchEvent(new Event('storage'));
        } catch (error) {
            console.error(`Error setting localStorage key “${key}”:`, error);
        }
    };

    const handleStorageChange = useCallback((event: StorageEvent) => {
            if (event?.key && event.key !== key) {
                return;
            }

            setValue(getStorageValue());
        },
        [key, getStorageValue],
    );

    useEffect(() => {
        window.addEventListener('storage', handleStorageChange);

        return () => window.removeEventListener('storage', handleStorageChange);
    }, [handleStorageChange]);

    return [value, updateValue];
};

const removeKey = (key: string) => {
    try {
        window.localStorage.removeItem(key);
        window.dispatchEvent(new Event('storage'));
    } catch (error) {
        console.error(`Error remove localStorage key “${key}”:`, error);
    }
};

// A wrapper for "JSON.parse()"" to support "undefined" value
export const parseJSON = <T>(value: string | null): T | undefined => {
    try {
        return value === 'undefined' ? undefined : JSON.parse(value ?? '');
    } catch {
        console.warn('parsing error on', { value });
        return undefined;
    }
}
