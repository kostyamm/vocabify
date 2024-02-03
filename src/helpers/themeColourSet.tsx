import { ThemeMode } from '../contexts';
import { createTheme, LinkProps } from '@mui/material';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { forwardRef } from 'react';

const BASE_PALETTE = {
    colorPrimary: '#42b883',
    colorPrimaryBg: 'rgba(66,184,131,0.6)',

    colorBgDefault: '#1a1a1a',
    colorBgPaper: '#242424',

    colorBorder: 'rgba(84, 84, 84, .48)',

    borderRadius: 8,
};

const LinkBehavior = forwardRef<
    HTMLAnchorElement,
    Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
    const { href, ...other } = props;
    // Map href (Material UI) -> to (react-router)
    return <RouterLink ref={ref} to={href} {...other} />;
});

export const lightTheme = createTheme({});
export const darkTheme = createTheme({
    shape: {
        borderRadius: BASE_PALETTE.borderRadius,
    },
    palette: {
        mode: 'dark',
        contrastThreshold: 4.5,
        background: {
            default: BASE_PALETTE.colorBgDefault,
            paper: BASE_PALETTE.colorBgPaper,
        },
        primary: {
            main: BASE_PALETTE.colorPrimary,
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'transparent',
                    borderBottom: `1px solid ${BASE_PALETTE.colorBorder}`,
                    boxShadow: 'none',
                },
            },
        },
        MuiContainer: {
            defaultProps: {
                maxWidth: 'lg',
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    background: BASE_PALETTE.colorBgDefault,
                    border: `1px solid ${BASE_PALETTE.colorBorder}`,
                },
            },
        },
        MuiLink: {
            defaultProps: {
                component: LinkBehavior,
            } as LinkProps,
        },
        MuiButton: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiTextField: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
});

export const appThemes = {
    [ThemeMode.Dark]: darkTheme,
    [ThemeMode.Light]: lightTheme,
};