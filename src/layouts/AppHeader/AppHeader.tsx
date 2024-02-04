import { Button, Flex, Layout, Menu, MenuProps, Space } from 'antd';
import { Container } from '../../components/Container';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { CSSProperties } from 'react';

export const AppHeader = () => {
    return (
        <Layout.Header style={headerStyle}>
            <Container large>
                <Flex align="center" justify="space-between">
                    <Link to="/">
                        Logo
                    </Link>

                    <AppHeaderMenu />
                </Flex>
            </Container>
        </Layout.Header>
    );
};

const AppHeaderMenu = () => {
    const { isAuth } = useAuthContext();
    const { menuItems, activeKeys } = useMenuItems()
    const navigate = useNavigate();

    if (!isAuth) {
        return (
            <Space.Compact>
                <Button onClick={() => navigate('/login')}>Log in</Button>
                <Button type="primary" onClick={() => navigate('/registration')}>Sing up</Button>
            </Space.Compact>
        );
    }
    return (
        <Menu
            mode="horizontal"
            selectedKeys={activeKeys}
            items={menuItems}
            triggerSubMenuAction="click"
            style={{ flex: 1, justifyContent: 'flex-end', background: 'transparent' }}
        />
    );
};

const useMenuItems = () => {
    const { logOut } = useAuthContext();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { key: '/vocabulary', label: 'Vocabulary', onClick: () => navigate('/vocabulary') },
        {
            key: '/account-menu', label: 'Account', icon: <UserOutlined />, children: [
                {
                    key: '/account',
                    label: 'Account',
                    icon: <UserOutlined />,
                    onClick: () => navigate('/account'),
                },
                {
                    key: 'divider',
                    type: 'divider',
                    style: { borderTopWidth: 1 },
                },
                {
                    key: 'logout',
                    label: 'Log out',
                    icon: <LogoutOutlined />,
                    onClick: logOut
                },
            ],
        },
    ] satisfies Required<MenuProps>['items'];


    const activeKeys = menuItems
        .map(({ key }) => key)
        .filter((key) => key.includes(pathname) && pathname !== '/');

    return { menuItems, activeKeys }
}

const headerStyle: CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 1,
};