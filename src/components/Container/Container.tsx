import { ContainerProps } from './Container.types.tsx';
import { ContainerHeader } from './ContainerHeader.tsx';
import { ContainerContent } from './ContainerContent.tsx';

export const Container = ({ children, large, style }: ContainerProps) => {
    const containerStyles = {
        maxWidth: large ? '1600px' : '1280px',
        width: '100%',
        margin: '0 auto',
        padding: '0 16px',
        ...style,
    };

    return (
        <div style={containerStyles}>{children}</div>
    );
};

Container.Header = ContainerHeader;
Container.Content = ContainerContent;