import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { routeGroups } from './routes.tsx';
import { ProtectedRoutes } from './layouts/ProtectedRoutes.tsx';
import { BaseLayout, ErrorLayout } from './layouts';

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            errorElement={<ErrorLayout />}
            element={<BaseLayout />}
        >
            {routeGroups.common.map(({ path, Element }) => (
                <Route key={path} path={path} element={<Element />} />
            ))}

            <Route
                path={'/'}
                element={<ProtectedRoutes />}
            >
                {routeGroups.auth.map(({ path, Element }) => (
                    <Route key={path} path={path} element={<Element />} />
                ))}
            </Route>
        </Route>,
    ),
);