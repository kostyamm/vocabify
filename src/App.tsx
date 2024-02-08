import { AppRouter } from './AppRouter.tsx';
import { AuthProvider, AppThemeProvider } from './contexts';

// https://www.npmjs.com/package/node-emoji
export const App = () => {
    return (
        <AppThemeProvider>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </AppThemeProvider>
    );
};
