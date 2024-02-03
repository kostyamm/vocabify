import { ThemeMode, useAuthContext, useThemeContext } from '../../contexts';
import {
    Avatar,
    Button,
    ButtonGroup,
    Divider, DividerProps,
    IconButton,
    IconButtonProps,
    Link,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from '@mui/material';
import { Fragment, useState } from 'react';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';

export const AppHeaderMenu = () => {
    const { isAuth, login } = useAuthContext();

    if (!isAuth) {
        return (
            <ButtonGroup variant="outlined">
                <Button onClick={() => login('asds')}>Log in</Button>
                <Button>Sing up</Button>
            </ButtonGroup>
        );
    }

    return (
        <Fragment>
            <Link href="/vocabulary">Vocabulary</Link>

            <AccountMenu />
            <MenuDivider />
            <ThemeMenu />
        </Fragment>
    );
};

const AccountMenu = () => {
    const { logOut } = useAuthContext()
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick: IconButtonProps['onClick'] = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar sx={{ width: 32, height: 32 }}>
                    M
                </Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            width: 200,
                            mt: 0.7
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => navigate('/account')}>
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>My account</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={logOut}>
                    <ListItemIcon>
                        <LogoutOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </Fragment>
    );
};

const themeOptions = {
    [ThemeMode.Light]: {
        text: 'Light',
        icon: <LightModeOutlinedIcon />,
    },
    [ThemeMode.Dark]: {
        text: 'Dark',
        icon: <DarkModeOutlinedIcon />,
    },
    [ThemeMode.System]: {
        text: 'System',
        icon: <ContrastOutlinedIcon />,
    },
};

const ThemeMenu = () => {
    const { setTheme, theme } = useThemeContext();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const activeOption = themeOptions[theme];

    const handleClick: IconButtonProps['onClick'] = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <IconButton
                onClick={handleClick}
                size="small"
                color="primary"
                sx={{ width: 32, height: 32 }}
                aria-controls={open ? 'theme-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                {activeOption.icon}
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="theme-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            width: 200,
                            mt: 1.1
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => setTheme(ThemeMode.Light)}>
                    <ListItemIcon>
                        <LightModeOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Light</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => setTheme(ThemeMode.Dark)}>
                    <ListItemIcon>
                        <DarkModeOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Dark</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => setTheme(ThemeMode.System)}>
                    <ListItemIcon>
                        <ContrastOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>System</ListItemText>
                </MenuItem>
            </Menu>
        </Fragment>
    );
};

const MenuDivider = () => {
    const getDividerSx: DividerProps['sx'] = (theme) => {
        return {
            height: 32,
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        };
    };

    return (
        <Divider sx={getDividerSx} orientation="vertical" />
    );
};
