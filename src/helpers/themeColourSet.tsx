import { theme, ThemeConfig } from 'antd';
import { ThemeMode } from '../contexts';

const lightTheme: ThemeConfig = {
    token: {
        fontSize: 16,

        controlHeight: 38,

        borderRadius: 12,

        colorPrimary: '#F27A54',
        colorPrimaryBg: '#F27A54',

        colorBgContainer: '#ffffff',
    },
    components: {
        Layout: {
            headerHeight: 64,
            headerPadding: 0,
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
        fontSize: 16,

        controlHeight: 38,

        borderRadius: 12,

        colorPrimary: '#F27A54',
        colorPrimaryBg: '#F27A54',
        colorSuccess: '#6FCF97',
        colorSuccessBg: '#6FCF97',

        colorBgBase: '#191919',
        colorBgLayout: '#191919',

        colorBgElevated: '#1C1C1C',
        colorBgContainer: '#262626',

        colorPrimaryBorder: '#333333',
        colorBorderSecondary: '#333333',
        colorBorder: '#4C4C4D',
    },
    components: {
        Layout: {
            headerHeight: 64,
            headerPadding: 0,
            headerBg: '#1C1C1C'
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