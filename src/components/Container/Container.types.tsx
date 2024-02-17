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

type HeaderActions = ReactNode | Array<ReactNode>

export type ContainerHeaderProps = {
    title: string,
    actions?: HeaderActions,
}

export type ContainerHeaderActionsProps = {
    actions?: HeaderActions
}