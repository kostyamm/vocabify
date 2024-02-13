import { Avatar, Button, Card, Dropdown, DropdownProps, List, Skeleton, theme } from 'antd';
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { LearnButton } from '../Buttons';
import { useDeleteDictionary, useUpdateDictionary } from '../../api/hooks';
import { Dictionary } from '../../api';

type DictionaryListProps = {
    dictionaryData: Array<Dictionary>
}

export const DictionaryList = ({ dictionaryData }: DictionaryListProps) => {
    const navigate = useNavigate();

    return (
        <List
            grid={{ gutter: 24, xs: 1, sm: 2, column: 3 }}
            dataSource={dictionaryData}
            renderItem={(item) => (
                <List.Item>
                    <Card
                        hoverable
                        title={<LearnButton itemId={item.id} />}
                        extra={<CardExtra item={item} />}
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

const CardExtra = ({ item }: { item: Dictionary }) => {
    const updateDictionary = useUpdateDictionary();
    const deleteDictionary = useDeleteDictionary();

    const onUpdateDictionary = async () => {
        const mutateData = {
            id: item.id,
            title: item.title + '[updated]',
        }

        await updateDictionary.mutateAsync(mutateData);
    };

    const onDeleteDictionary = async () => {
        await deleteDictionary.mutateAsync(item.id);
    };

    const dropdownItems: Required<DropdownProps>['menu']['items'] = [
        {
            key: 'edit',
            label: 'Edit',
            icon: <EditOutlined key="edit" />,
            onClick: ({ domEvent }) => {
                domEvent.stopPropagation();
                onUpdateDictionary();
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
                onDeleteDictionary()
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
