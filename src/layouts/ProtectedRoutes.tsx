import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../contexts';

export const ProtectedRoutes = () => {
    const { isAuth } = useAuthContext();

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Suspense fallback={<LoaderPages />}>
            <Outlet />
        </Suspense>
    );
};

const LoaderPages = () => {
    return <div>Loading pages...</div>;
};