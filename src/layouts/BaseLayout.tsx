import { Fragment } from 'react';
import { AppHeader } from './AppHeader';
import { AppContent } from './AppContent';

export const BaseLayout = () => {
    return (
        <Fragment>
            <AppHeader />
            <AppContent />
        </Fragment>
    );
};