import { Button, Divider, Dropdown, Flex, Layout, Menu, MenuProps, Space } from 'antd';
import { Container } from '../../components/Container';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeMode, useAuthContext, useThemeContext } from '../../contexts';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { CSSProperties } from 'react';
import { MoonIcon, SunIcon, SunMoonIcon } from '../../components/Icons';

export const AppHeader = () => {
    return (
        <Layout.Header style={headerStyle}>
            <Container large>
                <Flex align="center" justify="space-between">
                    <Link to="/">
                        Vocabify
                    </Link>

                    <AppHeadedMenu />
                    <Divider type="vertical" style={dividerStyle} />
                    <ThemeDropdown />
                </Flex>
            </Container>
        </Layout.Header>
    );
};

const ThemeDropdown = () => {
    const { theme, setTheme } = useThemeContext();
    const { Light, Dark, System } = ThemeMode;

    const dropdownItems = [
        {
            key: Light,
            label: 'Light',
            icon: <SunIcon />,
            onClick: () => setTheme(Light),
        },
        {
            key: Dark,
            label: 'Dark',
            icon: <MoonIcon />,
            onClick: () => setTheme(Dark),
        },
        {
            key: System,
            label: 'System',
            icon: <SunMoonIcon />,
            onClick: () => setTheme(System),
        },
    ];

    const activeTheme = () => dropdownItems.find(({ key }) => key === theme);

    return (
        <Dropdown
            menu={{ items: dropdownItems }}
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
            trigger={['click']}
        >
            <Button type="primary" shape="circle" icon={activeTheme()!.icon} style={themeButtonStyle} />
        </Dropdown>
    );
};

const AppHeadedMenu = () => {
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
            key: '/account-menu',
            label: 'Account',
            icon: <UserOutlined />,
            children: [
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
                    onClick: logOut,
                },
            ],
        },
    ] satisfies Required<MenuProps>['items'];


    const activeKeys = menuItems
        .map(({ key }) => key)
        .filter((key) => key.includes(pathname) && pathname !== '/');

    return { menuItems, activeKeys };
};

const headerStyle: CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 1,
};

const menuStyle: CSSProperties = {
    flex: 1,
    justifyContent: 'flex-end',
    background: 'transparent',
};

const dividerStyle: CSSProperties = {
    marginRight: 16,
    height: 24,
};

const themeButtonStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};
