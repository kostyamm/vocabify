import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppRouter } from './AppRouter.tsx';
import { AuthProvider, AppThemeProvider } from './contexts';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: 1,
        },
    },
});

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />

            <AppThemeProvider>
                <AuthProvider>
                    <AppRouter />
                </AuthProvider>
            </AppThemeProvider>
        </QueryClientProvider>
    );
};
