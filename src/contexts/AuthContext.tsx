import { createContext, useContext, useMemo } from 'react';
import { AuthContextProps, AuthProviderProps } from './AuthContext.types.tsx';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';

const TOKEN_STORAGE_KEY = 'token';

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = (({ children }: AuthProviderProps) => {
    const [token, setToken] = useLocalStorage<string | null>(TOKEN_STORAGE_KEY, null);

    const login = (token: string) => setToken(token);
    const logOut = () => setToken(null);

    const context = useMemo(() => ({
        isAuth: !!token,
        token,
        login,
        logOut,
    }), [token]);

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
});

export const useAuthContext = () => {
    const appContext = useContext(AuthContext);

    if (appContext === null || appContext === undefined) {
        throw new Error('AppContext cannot be null');
    }

    return appContext;
};
