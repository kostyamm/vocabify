import { ReactNode } from 'react';
import { CardProps } from 'antd';

export type ContainerProps = {
    children: ReactNode;
    large?: boolean;
}

export type ContainerContentProps = Omit<CardProps, 'style' | 'bordered'> & {
    children: ReactNode
}

type HeaderActions = ReactNode | Array<ReactNode>

export type ContainerHeaderProps = {
    title: string | ReactNode,
    actions?: HeaderActions,
    loading?: boolean;
}

export type ContainerHeaderActionsProps = {
    actions?: HeaderActions
}