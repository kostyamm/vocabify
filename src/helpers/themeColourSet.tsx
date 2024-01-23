// import { theme, ThemeConfig } from 'antd';
// const { darkAlgorithm } = theme;

// export const lightTheme: ThemeConfig = {}
// export const darkTheme: ThemeConfig = {
//     algorithm: darkAlgorithm,
//     components: {
//         Layout: {
//             headerBg: 'rgba(26,26,26, 0.9)',
//             headerPadding: '0 20px',
//             headerHeight: 64,
//         },
//         Menu: {
//             itemBg: 'transparent',
//             lineWidth: 0,
//         },
//     },
//     token: {
//         borderRadius: 8,
//         colorPrimary: '#42b883',
//         colorPrimaryBg: 'rgba(66,184,131,0.6)',
//         colorLink: '#42b883',
//         colorBgContainer: '#2f2f2f',
//         colorBgLayout: '#1a1a1a',
//
//         colorBorder: 'rgba(84, 84, 84, .48)',
//         colorPrimaryBorder: 'rgba(84, 84, 84, .48)',
//         colorBorderSecondary: 'rgba(84, 84, 84, .48)',
//     },
// };

import { ThemeMode } from '../contexts';
import { createTheme, LinkProps } from '@mui/material';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { forwardRef } from 'react';

const LinkBehavior = forwardRef<
    HTMLAnchorElement,
    Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
    const { href, ...other } = props;
    // Map href (Material UI) -> to (react-router)
    return <RouterLink ref={ref} to={href} {...other} />;
});

export const lightTheme = createTheme({})
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        contrastThreshold: 4.5,
        background: {
            default: 'rgb(16, 20, 24)',
            paper: 'rgba(16, 20, 24, 0.8)',
        },
    },
    components: {
        MuiContainer: {
            defaultProps: {
                maxWidth: 'xl'
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(8px)',
                    boxShadow: 'none',
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    background: 'transparent',
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
                size: 'small'
            }
        },
        MuiTextField: {
            defaultProps: {
                size: 'small'
            }
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
    [ThemeMode.Light]: lightTheme
}