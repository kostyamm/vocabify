import { ThemeMode, useThemeContext } from '../../contexts';
import { MoonIcon, SunIcon, SunMoonIcon } from '../../components/Icons';
import { Button, Dropdown } from 'antd';
import { CSSProperties } from 'react';

export const ThemeDropdown = () => {
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
            {/* Did not use IconButton here to avoid the menu error */}
            <Button shape="circle" icon={activeTheme()!.icon} style={themeButtonStyle} />
        </Dropdown>
    );
};

const themeButtonStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};
