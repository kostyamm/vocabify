import { useAuthContext } from '../../contexts';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Menu, MenuProps, Space } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { CSSProperties } from 'react';

export const AppHeadedMenu = () => {
    const { isAuth } = useAuthContext();
    const { menuItems, activeKeys } = useMenuItems();
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
            style={menuStyle}
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
            key: '/account',
            label: 'Account',
            icon: <UserOutlined />,
            children: [
                {
                    key: '/account-sub-link',
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
                    onClick: logOut,
                },
            ],
        },
    ] satisfies Required<MenuProps>['items'];


    const activeKeys = menuItems
        .map(({ key }) => key)
        .filter((key) => pathname.includes(key) && pathname !== '/');

    return { menuItems, activeKeys };
};

const menuStyle: CSSProperties = {
    flex: 1,
    justifyContent: 'flex-end',
    background: 'transparent',
};