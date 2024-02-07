import { Avatar, Button, Card, List, Skeleton } from 'antd';
import { EditOutlined, RightOutlined } from '@ant-design/icons';
import { GraduationIcon } from '../Icons';
import { useNavigate } from 'react-router-dom';

const data = [
    {
        id: 1,
        title: 'English',
    },
    {
        id: 2,
        title: 'Polish',
    },
    {
        id: 3,
        title: 'Belarusian',
    },
    {
        id: 4,
        title: 'Title 4',
    },
    {
        id: 5,
        title: 'Title 4',
    },
    {
        id: 6,
        title: 'Title 4',
    },
    {
        id: 7,
        title: 'Title 4',
    },
];

export const GroupList = () => {
    const navigate = useNavigate();

    return (
        <List
            grid={{ gutter: 24, xs: 1, sm: 2, column: 3 }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <Card
                        style={{ gap: 100 }}
                        hoverable
                        onClick={() => {
                            navigate(`/vocabulary/${item.id}`)
                        }}
                        actions={[
                            <Button
                                type="text"
                                icon={<EditOutlined key="edit" />}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    navigate(`/vocabulary/${item.id}`)
                                }}
                            >
                                Edit
                            </Button>,
                            <Button
                                type="text"
                                icon={<GraduationIcon key="learn" />}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    navigate(`/learn`)
                                }}
                            >
                                Learn
                            </Button>,
                            <Button
                                type="text"
                                icon={<RightOutlined key="open" />}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    navigate(`/vocabulary/${item.id}`)
                                }}
                            >
                                Open
                            </Button>,
                        ]}
                    >
                        <Skeleton loading={false} avatar active>
                            <List.Item.Meta
                                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />}
                                title={item.title}
                                description="This is the description"
                            />
                        </Skeleton>
                    </Card>
                </List.Item>
            )}
        />
    )
}