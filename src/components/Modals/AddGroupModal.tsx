import { Fragment, useState } from 'react';
import { Button, ButtonProps, Form, Input, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useYupValidator } from '../../hooks/useYupValidator.ts';
import { InferType, object, string } from 'yup';
import { useCreateDictionary } from '../../api/hooks';

type OpenButton = Omit<ButtonProps, 'onClick'>

type AddGroupModalProps = {
    openButtonProps?: OpenButton
}

type OpenButtonProps = {
    openButtonProps?: OpenButton,
    showModal: () => void
}

const groupFromSchema = object().shape({
    title: string().required(),
});

type GroupFromSchema = InferType<typeof groupFromSchema>

export const AddGroupModal = (props: AddGroupModalProps) => {
    const [open, setOpen] = useState(false);

    const [form] = Form.useForm<GroupFromSchema>();
    const { yupSync, formValidate } = useYupValidator(groupFromSchema, form);

    const createDictionary = useCreateDictionary()

    const showModal = () => setOpen(true);
    const hideModal = () => setOpen(false);

    const handleOk = async () => {
        const isValid = await formValidate()

        if (!isValid) {
            return
        }

        form.submit()
        setOpen(false);
    };

    const onFinish = async ({ title }: GroupFromSchema) => {
        await createDictionary.mutateAsync({ title })
    };

    return (
        <Fragment>
            <OpenButton showModal={showModal} openButtonProps={props.openButtonProps} />
            <Modal
                title="Create group"
                open={open}
                okText="Create"
                onOk={handleOk}
                confirmLoading={createDictionary.isPending}
                onCancel={hideModal}
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Form.Item
                        label="Group Name"
                        name="title"
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