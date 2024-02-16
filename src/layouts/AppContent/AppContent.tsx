import { Layout, theme } from 'antd';
import { Container } from '../../components/Container';
import { Outlet } from 'react-router-dom';

export const AppContent = () => {
    const { token } = theme.useToken();

    const contentStyle = {
        minHeight: `calc(100dvh - ${token.Layout?.headerHeight}px)`,
        height: '100%',
        padding: '48px 0',
    };

    return (
        <Layout.Content style={contentStyle}>
            <Container>
                <Outlet />
            </Container>
        </Layout.Content>
    );
};