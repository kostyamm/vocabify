import { Fragment } from 'react';
import { Flex, Grid, Typography } from 'antd';
import { ContainerHeaderActionsProps, ContainerHeaderProps } from './Container.types.tsx';

export const ContainerHeader = ({ title, actions }: ContainerHeaderProps) => {
    const breakpoint = Grid.useBreakpoint()
    const isMobile = !breakpoint.md
    return (
        <Flex
            align="center"
            justify={isMobile ? 'center' : 'space-between'}
            wrap="wrap"
            gap={16}
            style={{ marginBottom: 32 }}
        >
            <Typography.Title style={{ margin: 0 }}>{title}</Typography.Title>
            <ContainerHeaderActions actions={actions} />
        </Flex>
    );
};

const ContainerHeaderActions = ({ actions }: ContainerHeaderActionsProps) => {
    if (Array.isArray(actions) && actions.length) {
        return (
            <Flex gap={16}>
                {actions.map((action, index) => (
                    <Fragment key={index}>
                        {action}
                    </Fragment>
                ))}
            </Flex>
        );
    }

    return (
        <Fragment>
            {actions}
        </Fragment>
    );
};