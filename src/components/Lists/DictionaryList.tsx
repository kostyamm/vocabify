import { Avatar, Button, Card, Dropdown, DropdownProps, List, Skeleton, theme } from 'antd';
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { LearnButton } from '../Buttons';

type DictionaryItem = {
    id: number,
    title: string
    originalLanguage: string,
    targetLanguage: string,
}

type DictionaryListProps = {
    groups: Array<DictionaryItem>
}

export const DictionaryList = ({ groups }: DictionaryListProps) => {
    const navigate = useNavigate();

    return (
        <List
            grid={{ gutter: 24, xs: 1, sm: 2, column: 3 }}
            dataSource={groups}
            renderItem={(item) => (
                <List.Item>
                    <Card
                        hoverable
                        title={<LearnButton itemId={item.id} />}
                        extra={<CardExtra itemId={item.id} />}
                        onClick={() => navigate(`/dictionary/${item.id}`)}
                    >
                        <Skeleton loading={false} avatar active>
                            <Card.Meta
                                avatar={<CardMetaAvatar title={item.title} />}
                                title={item.title}
                                description={`${item.originalLanguage} to ${item.targetLanguage}`}
                            />
                        </Skeleton>
                    </Card>
                </List.Item>
            )}
        />
    );
};

const CardMetaAvatar = ({ title }: { title: string }) => {
    const { token } = theme.useToken();

    return (
        <Avatar style={{ backgroundColor: token.colorPrimary }}>
            {title[0]}
        </Avatar>
    );
};

const CardExtra = ({ itemId }: { itemId: number }) => {
    const dropdownItems: Required<DropdownProps>['menu']['items'] = [
        {
            key: 'edit',
            label: 'Edit',
            icon: <EditOutlined key="edit" />,
            onClick: ({ domEvent }) => {
                domEvent.stopPropagation();
            },
        },
        {
            key: 'divider',
            type: 'divider',
        },
        {
            key: 'delete',
            label: 'Delete',
            icon: <DeleteOutlined key="delete" />,
            onClick: ({ domEvent }) => {
                domEvent.stopPropagation();
                console.log(`Delete action for ${itemId}`);
            },
        },
    ];

    return (
        <Dropdown
            autoAdjustOverflow
            menu={{ items: dropdownItems }}
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
            trigger={['click']}
        >
            {/* Did not use IconButton here to avoid the menu error */}
            <Button icon={<EllipsisOutlined />} onClick={(event) => event.stopPropagation()} />
        </Dropdown>
    );
};
