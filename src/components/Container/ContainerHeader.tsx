import { ContainerHeaderProps } from './Container.types.tsx';
import { Flex, Typography } from 'antd';

export const ContainerHeader = ({ title, action }: ContainerHeaderProps) => {
    return (
        <Flex
            align="center"
            justify="space-between"
            wrap="wrap"
            gap={8}
            style={{ marginBottom: 32 }}
        >
            <Typography.Title style={{ margin: 0 }}>{title}</Typography.Title>
            {action}
        </Flex>
    );
};