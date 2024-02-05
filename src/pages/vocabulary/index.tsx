import { Button, Flex, Input, Modal, Space, Typography } from 'antd';
import { Fragment, useState } from 'react';

const { Title } = Typography;

export const Vocabulary = () => {
    return (
        <Fragment>
            <Flex align="center" justify="space-between">
                <Title>Vocabulary</Title>
                <GroupCreateModal />
            </Flex>
        </Fragment>
    );
};

const GroupCreateModal = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <Fragment>
            <Button type="primary" onClick={showModal}>Create group</Button>
            <Modal
                title="Title"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Space.Compact style={{ width: '100%' }}>
                    <Input defaultValue="New Group" />
                    <Button type="primary">Create</Button>
                </Space.Compact>
            </Modal>
        </Fragment>
    );
};
