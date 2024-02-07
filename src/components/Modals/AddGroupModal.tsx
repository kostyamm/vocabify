import { Fragment, useState } from 'react';
import { Button, ButtonProps, Input, Modal, Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

type OpenButton = Omit<ButtonProps, 'onClick'>

type AddGroupModalProps = {
    openButtonProps?: OpenButton
}

type OpenButtonProps = {
    openButtonProps?: OpenButton,
    showModal: () => void
}

export const AddGroupModal = (props: AddGroupModalProps) => {
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
            <OpenButton showModal={showModal} openButtonProps={props.openButtonProps} />
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

const OpenButton = (props: OpenButtonProps) => {
    if (props.openButtonProps) {
        return <Button onClick={props.showModal} {...props} />;
    }

    return (
        <Button type="primary" size="large" onClick={props.showModal} icon={<PlusCircleOutlined />}>
            Create group
        </Button>
    );
};