import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthContext, useThemeContext, ThemeMode } from '../contexts';
import { usePopupState } from 'material-ui-popup-state/hooks';
import { bindMenu, bindTrigger } from 'material-ui-popup-state';
import CloudIcon from '@mui/icons-material/Cloud';
import {
    AppBar,
    Avatar,
    Button,
    ButtonGroup,
    Container,
    Divider,
    IconButton,
    Link,
    Menu,
    MenuItem,
    Toolbar,
    styled, Box,
} from '@mui/material';

// https://mui.com/material-ui/react-app-bar/#fixed-placement
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export const BaseLayout = () => {
    return (
        <Fragment>
            <AppHeader />
            <AppContent />
        </Fragment>
    );
};

const AppHeader = () => {
    return (
        <AppBar position="sticky">
            <Container>
                <Toolbar variant="dense" disableGutters>
                    <Offset />

                    <Link href="/">
                        <CloudIcon />
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <AppHeaderMenu />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

const AppHeaderMenu = () => {
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
            <AccountDropdown />
        </Fragment>
    );
};

const AccountDropdown = () => {
    const { logOut } = useAuthContext();
    const { setTheme, theme } = useThemeContext();

    const popupState = usePopupState({ variant: 'popover', popupId: 'user-menu' });

    return (
        <Fragment>
            <IconButton
                {...bindTrigger(popupState)}
                size="small"
                sx={{ ml: 2 }}
            >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
            <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>Account</MenuItem>
                <MenuItem
                    onClick={() => setTheme(theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light)}>Theme: {theme}</MenuItem>
                <Divider />
                <MenuItem onClick={logOut}>Log out</MenuItem>
            </Menu>
        </Fragment>
    );
};

const AppContent = () => {
    return (
        <Container>
            <Outlet />
        </Container>
    );
};