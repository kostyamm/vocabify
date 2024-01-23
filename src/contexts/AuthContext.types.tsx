import { ReactNode } from 'react';

export type AuthContextProps = {
    isAuth: boolean,
    token: string | null,
    login: (value: string) => void,
    logOut: () => void
}

export type AuthProviderProps = {
    children: ReactNode
}
