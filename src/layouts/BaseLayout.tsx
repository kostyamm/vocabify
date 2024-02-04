import { Layout } from 'antd';
import { AppHeader } from './AppHeader';
import { AppContent } from './AppContent';

export const BaseLayout = () => {
    return (
        <Layout>
            <AppHeader />
            <AppContent />
        </Layout>
    );
};
