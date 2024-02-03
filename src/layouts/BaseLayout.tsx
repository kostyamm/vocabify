import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { AppHeader } from './AppHeader';

export const BaseLayout = () => {
    return (
        <Fragment>
            <AppHeader />
            <AppContent />
        </Fragment>
    );
};

const AppContent = () => {
    return (
        <Container>
            <Outlet />
        </Container>
    );
};