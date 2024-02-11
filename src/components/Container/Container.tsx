import { ReactNode } from 'react';

export const Container = ({ children, large }: { children: ReactNode, large?: boolean }) => {
    const containerStyles = {
        maxWidth: large ? '1600px' : '1280px',
        width: '100%',
        margin: '0 auto',
        padding: '0 16px',
    };

    return (
        <div style={containerStyles}>{children}</div>
    );
};