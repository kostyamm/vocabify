import { Divider, Flex, Layout, theme } from 'antd';
import { Container } from '../../components/Container';
import { CSSProperties } from 'react';
import { AppLogo } from '../../components/AppLogo';
import { ThemeDropdown } from './ThemeDropdown.tsx';
import { AppHeadedMenu } from './AppHeadedMenu.tsx';

export const AppHeader = () => {
    const { headerStyle, dividerStyle } = useHeaderStyles();

    return (
        <Layout.Header style={headerStyle}>
            <Container large>
                <Flex align="center" justify="space-between">
                    <AppLogo />

                    <Flex align="center" justify="flex-end" style={{ flex: 1 }}>
                        <AppHeadedMenu />
                        <Divider type="vertical" style={dividerStyle} />
                        <ThemeDropdown />
                    </Flex>
                </Flex>
            </Container>
        </Layout.Header>
    );
};

const useHeaderStyles = () => {
    const { token } = theme.useToken();

    const headerStyle: CSSProperties = {
        position: 'sticky',
        top: 0,
        zIndex: 1,
        boxShadow: `0px -1px 0px 0px ${token.colorBorderSecondary} inset`,
    };

    const dividerStyle: CSSProperties = {
        marginRight: 16,
        height: 24,
    };

    return { headerStyle, dividerStyle };
};
