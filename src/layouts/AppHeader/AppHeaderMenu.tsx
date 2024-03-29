import { useAuthContext } from '../../contexts';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Menu, MenuProps, Space } from 'antd';
import { CSSProperties } from 'react';
import { LogOutIcon, UserIcon } from '../../components/Icons';

export const AppHeaderMenu = () => {
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
        { key: '/decks', label: 'Decks', onClick: () => navigate('/decks') },
        {
            key: '/account',
            label: 'Account',
            icon: <UserIcon />,
            children: [
                {
                    key: '/account-sub-link',
                    label: 'Account',
                    icon: <UserIcon />,
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
                    icon: <LogOutIcon />,
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