import { createContext, useContext, useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppThemeContextProps, AppThemeProviderProps, ThemeMode } from './AppThemeContext.types.tsx';
import { appThemes } from '../helpers/themeColourSet.tsx';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import { useSystemTheme } from '../hooks/useSystemTheme.ts';

const AppThemeContext = createContext<AppThemeContextProps | null>(null);

const { Light, Dark, System } = ThemeMode

const THEME_STORAGE_KEY = 'theme'
const DEFAULT_THEME = Dark

export const AppThemeProvider = (({ children }: AppThemeProviderProps) => {
    const [storageTheme, setStorageTheme] = useLocalStorage(THEME_STORAGE_KEY, DEFAULT_THEME)
    const { detectedTheme } = useSystemTheme()
    const shouldDetect = storageTheme === System

    const activeTheme = shouldDetect ? detectedTheme : storageTheme

    const isDarkTheme = activeTheme !== Light
    const isCorrectTheme = Object.values(ThemeMode).some((theme) => theme === activeTheme)

    const themeVariant = appThemes[isCorrectTheme ? activeTheme : DEFAULT_THEME]
    const theme = isCorrectTheme ? storageTheme : DEFAULT_THEME

    const context = useMemo(() => ({
        theme,
        isDarkTheme,
        setTheme: setStorageTheme,
    }), [storageTheme]);

    return (
        <AppThemeContext.Provider value={context}>
            <ThemeProvider theme={themeVariant}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppThemeContext.Provider>
    );
});

export const useThemeContext = () => {
    const appContext = useContext(AppThemeContext);

    if (appContext === null || appContext === undefined) {
        throw new Error('AppContext cannot be null');
    }

    return appContext;
};
