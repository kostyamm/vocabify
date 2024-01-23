import { ReactNode } from 'react';

export type AppThemeContextProps = {
    theme: ThemeMode,
    isDarkTheme: boolean,
    setTheme: (theme: ThemeMode) => void,
}

export type AppThemeProviderProps = {
    children: ReactNode
}

export enum ThemeMode {
    Light = 'light',
    Dark = 'dark',
    System = 'system'
}