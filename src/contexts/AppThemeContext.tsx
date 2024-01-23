import { createContext, useContext, useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppThemeContextProps, AppThemeProviderProps, ThemeMode } from './AppThemeContext.types.tsx';
import { appThemes } from '../helpers/themeColourSet.tsx';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import { useSystemTheme } from '../hooks/useSystemTheme.ts';

const AppThemeContext = createContext<AppThemeContextProps | null>(null);

const THEME_STORAGE_KEY = 'theme'

const { Light, Dark, System } = ThemeMode

export const AppThemeProvider = (({ children }: AppThemeProviderProps) => {
    const [theme, setTheme] = useLocalStorage(THEME_STORAGE_KEY, Dark)
    const { detectedTheme } = useSystemTheme()
    const shouldDetect = theme === System

    const activeTheme = shouldDetect ? detectedTheme : theme
    const isDarkTheme = activeTheme !== Light

    const themeVariant = appThemes[activeTheme]

    const context = useMemo(() => ({
        theme,
        isDarkTheme,
        setTheme,
    }), [theme]);

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
