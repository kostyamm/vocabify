import { AppRouter } from './AppRouter.tsx';
import { AuthProvider, AppThemeProvider } from './contexts';

export const App = () => {
    return (
        <AppThemeProvider>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </AppThemeProvider>
    );
};
