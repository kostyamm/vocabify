import { Container, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const AppContent = () => {
    const containerSx = useContainerSx()
    return (
        <Container sx={containerSx}>
            <Outlet />
        </Container>
    );
};

const useContainerSx = () => {
    const { spacing } = useTheme()
    const appBarHeight = useAppBarHeight()

    return {
        height: '100%',
        minHeight: `calc(100dvh - ${appBarHeight}px)`,
        paddingTop: spacing(3),
        paddingBottom: spacing(3),
    }
}

const useAppBarHeight = (): number => {
    const { mixins, breakpoints } = useTheme();
    const toolbar: { [k: string]: any } = mixins.toolbar

    const toolbarDesktopQuery = breakpoints.up('sm');
    const toolbarLandscapeQuery = `${breakpoints.up('xs')} and (orientation: landscape)`;

    const isDesktop = useMediaQuery(toolbarDesktopQuery);
    const isLandscape = useMediaQuery(toolbarLandscapeQuery);

    if (isDesktop) {
        return toolbar[toolbarDesktopQuery].minHeight
    }

    if (isLandscape) {
        return toolbar[toolbarLandscapeQuery].minHeight
    }

    return toolbar.minHeight
}