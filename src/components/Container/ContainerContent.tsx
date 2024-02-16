import { ContainerContentProps } from './Container.types.tsx';
import { Card, Grid, theme } from 'antd';

export const ContainerContent = ({ children, ...cardProps }: ContainerContentProps) => {
    const { token } = theme.useToken();
    const breakpoint = Grid.useBreakpoint();

    const containerStyle = {
        backgroundColor: token.colorBgContainer,
        borderRadius: token.borderRadius,

        margin: !breakpoint.md ? '-16px' : 0,
    };

    return <Card size="small" {...cardProps} bordered={false} style={containerStyle}>{children}</Card>;
};