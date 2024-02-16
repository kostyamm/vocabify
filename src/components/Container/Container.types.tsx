import { CSSProperties, ReactNode } from 'react';
import { CardProps } from 'antd';

export type ContainerProps = {
    children: ReactNode;
    style?: CSSProperties;
    large?: boolean;
}

export type ContainerContentProps = Omit<CardProps, 'style' | 'bordered'> & {
    children: ReactNode
}

export type ContainerHeaderProps = {
    title: string,
    action?: ReactNode,
}