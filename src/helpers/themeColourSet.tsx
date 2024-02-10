import { theme, ThemeConfig } from 'antd';
import { ThemeMode } from '../contexts';

const BASE_PALETTE = {
    colorPrimary: '#42b883',
    colorPrimaryBg: 'rgba(66,184,131,0.6)',

    colorBgDefault: '#161616',
    colorBgPaper: '#181818',

    colorBorder: 'rgba(84, 84, 84, .48)',

    borderRadius: 12,
};

const lightTheme: ThemeConfig = {
    token: {
        colorPrimary: BASE_PALETTE.colorPrimary,
        colorPrimaryBg: BASE_PALETTE.colorPrimaryBg,
        // colorPrimaryText: BASE_PALETTE.colorPrimary,
    },
    components: {
        Layout: {
            headerHeight: 64,
            headerPadding: 0,
            // headerBg: 'transparent',
            headerBg: '#ffffff',
        },
        Menu: {
            lineWidth: 0,
        },
        List: {
            margin: 24,
        },
    },
};

const darkTheme: ThemeConfig = {
    algorithm: theme.darkAlgorithm,
    token: {
        colorPrimary: BASE_PALETTE.colorPrimary,
        colorPrimaryBg: BASE_PALETTE.colorPrimaryBg,
        // colorPrimaryText: BASE_PALETTE.colorPrimary,

        // colorBgLayout: 'white',
        // colorBgContainer: '#141414'
    },
    components: {
        Layout: {
            headerHeight: 64,
            headerPadding: 0,
            headerBg: 'transparent',
            // headerBg: '#141414',
        },
        Menu: {
            lineWidth: 0,
        },
        List: {
            margin: 24,
        },
    },
};

export const appThemes = {
    [ThemeMode.Dark]: darkTheme,
    [ThemeMode.Light]: lightTheme,
};