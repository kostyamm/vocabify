import { theme, ThemeConfig } from 'antd';

const BASE_PALETTE = {
    colorPrimary: '#42b883',
    colorPrimaryBg: 'rgba(66,184,131,0.6)',

    colorBgDefault: '#161616',
    colorBgPaper: '#181818',

    colorBorder: 'rgba(84, 84, 84, .48)',

    borderRadius: 12,
};

const { darkAlgorithm } = theme
const lightTheme: ThemeConfig = {
    token: {
        colorPrimary: BASE_PALETTE.colorPrimary,
        // colorPrimaryText: BASE_PALETTE.colorPrimary,
        // colorPrimaryBg: BASE_PALETTE.colorPrimaryBg
    },
    components: {
        Layout: {
            headerHeight: 64,
            headerPadding: 0,
            headerBg: 'transparent',
        },
        Menu: {
            lineWidth: 0,
        },
    }
}

const darkTheme: ThemeConfig = {
    algorithm: darkAlgorithm,
    token: {
        colorPrimary: BASE_PALETTE.colorPrimary,
    },
    components: {
        Layout: {
            headerHeight: 64,
            headerPadding: 0,
            headerBg: 'transparent',
        },
        Menu: {
            lineWidth: 0,
        },
    }
}

import { ThemeMode } from '../contexts';

export const appThemes = {
    [ThemeMode.Dark]: darkTheme,
    [ThemeMode.Light]: lightTheme,
};