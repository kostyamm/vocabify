import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ContainerOwnProps } from '@mui/material/Container/Container';

export const AppContent = () => {
    return (
        <Container sx={getContainerSx}>
            <Outlet />
        </Container>
    );
};

const getContainerSx: ContainerOwnProps['sx'] = ({ spacing }) => ({
    paddingTop: spacing(3),
    paddingBottom: spacing(3),
})