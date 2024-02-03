import { ThemeMode, useAuthContext, useThemeContext } from '../../contexts';
import { Avatar, Button, ButtonGroup, Divider, IconButton, Link, Menu, MenuItem } from '@mui/material';
import { Fragment } from 'react';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';

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