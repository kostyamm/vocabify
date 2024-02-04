import { Layout, theme } from 'antd';
import { Container } from '../../components/Container';
import { Outlet } from 'react-router-dom';

const { useToken } = theme;

export const AppContent = () => {
    const { token } = useToken();

    const contentStyle = {
        minHeight: `calc(100dvh - ${token.Layout?.headerHeight}px)`,
        height: '100%',
        padding: '24px 0',
    };

    return (
        <Layout.Content style={contentStyle}>
            <Container>
                <Outlet />
            </Container>
        </Layout.Content>
    );
};