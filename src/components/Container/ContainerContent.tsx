import { ContainerContentProps } from './Container.types.tsx';
import { Card, Grid, theme } from 'antd';

export const ContainerContent = ({ children, ...cardProps }: ContainerContentProps) => {
    const { token } = theme.useToken();
    const breakpoint = Grid.useBreakpoint();

    const isMobile = !breakpoint.md;

    const containerStyle = {
        backgroundColor: token.colorBgContainer,
        borderRadius: token.borderRadius,
        margin: isMobile ? '0 -16px' : 0,
    };

    return <Card
        size={isMobile ? 'small' : 'default'}
        bordered={false}
        style={containerStyle}
        {...cardProps}
    >
        {children}
    </Card>;
};