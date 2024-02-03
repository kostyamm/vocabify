import { AppBar, Box, Container, styled, Toolbar } from '@mui/material';
import { AppHeaderLogo } from './AppHeaderLogo.tsx';
import { AppHeaderMenu } from './AppHeaderMenu.tsx';

// https://mui.com/material-ui/react-app-bar/#fixed-placement
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export const AppHeader = () => {
    return (
        <AppBar position="sticky">
            <Container>
                <Toolbar variant="dense" disableGutters>
                    <Offset />

                    <AppHeaderLogo />

                    <Box sx={{ flexGrow: 1 }} />

                    <AppHeaderMenu />
                </Toolbar>
            </Container>
        </AppBar>
    );
};
