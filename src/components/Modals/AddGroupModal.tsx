import { Fragment, useState } from 'react';
import { Button, ButtonProps, Form, Input, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useYupValidator } from '../../hooks/useYupValidator.ts';
import { InferType, object, string } from 'yup';

type OpenButton = Omit<ButtonProps, 'onClick'>

type AddGroupModalProps = {
    openButtonProps?: OpenButton
}

type OpenButtonProps = {
    openButtonProps?: OpenButton,
    showModal: () => void
}

const groupFromSchema = object().shape({
    name: string().required(),
});

type GroupFromSchema = InferType<typeof groupFromSchema>

export const AddGroupModal = (props: AddGroupModalProps) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm<GroupFromSchema>();
    const { yupSync, formValidate } = useYupValidator(groupFromSchema, form);

    const showModal = () => setOpen(true);
    const hideModal = () => setOpen(false);

    const handleOk = async () => {
        const isValid = await formValidate()

        if (!isValid) {
            return
        }

        setConfirmLoading(true);
        form.submit()

        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Fragment>
            <OpenButton showModal={showModal} openButtonProps={props.openButtonProps} />
            <Modal
                title="Create group"
                open={open}
                okText="Create"
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={hideModal}
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        required
                        initialValue="New Group"
                        rules={[yupSync]}
                    >
                        <Input size="large" />
                    </Form.Item>
                </Form>
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