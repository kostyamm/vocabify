import { Link } from 'react-router-dom';
import { Flex, Grid } from 'antd';
import logo from '../../assets/logo.svg'

export const AppLogo = () => {
    const breakpoint = Grid.useBreakpoint()
    const isMobile = !breakpoint.md

    return (
        <Link to="/">
            <Flex gap={8} align="center">
                <img src={logo} alt="Vocabify" />
                {!isMobile && <div>Vocabify</div>}
            </Flex>
        </Link>
    );
};
