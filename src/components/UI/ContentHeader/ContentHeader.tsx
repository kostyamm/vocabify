import { Flex, Typography } from 'antd';
import { ReactNode } from 'react';

const { Title } = Typography

type ContentHeaderProps = {
    title: string,
    action?: ReactNode
}

export const ContentHeader = ({ title, action }: ContentHeaderProps) => {
    return (
        <Flex
            align="center"
            justify="space-between"
            wrap="wrap"
            gap={8}
            style={{ marginBottom: 32 }}
        >
            <Title style={{ margin: 0 }}>{title}</Title>
            {action}
        </Flex>
    )
}