import { Fragment, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useYupValidator } from '../../hooks/useYupValidator.ts';
import { InferType, object, string } from 'yup';
import { useCreateDeck } from '../../api/hooks';
import { AddGroupModalProps, OpenButtonProps } from './AddDeckModal.types.tsx';
import { PlusIcon } from '../Icons';

const groupFromSchema = object().shape({
    title: string().required(),
});

type GroupFromSchema = InferType<typeof groupFromSchema>

export const AddDeckModal = (props: AddGroupModalProps) => {
    const [open, setOpen] = useState(false);

    const [form] = Form.useForm<GroupFromSchema>();
    const { yupSync, formValidate } = useYupValidator(groupFromSchema, form);

    const createDeck = useCreateDeck()

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
        await createDeck.mutateAsync({ title })
    };

    return (
        <Fragment>
            <OpenButton showModal={showModal} openButtonProps={props.openButtonProps} />
            <Modal
                title="Create Deck"
                open={open}
                okText="Create"
                onOk={handleOk}
                confirmLoading={createDeck.isPending}
                onCancel={hideModal}
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Form.Item
                        label="Deck Name"
                        name="title"
                        required
                        initialValue="New Deck"
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
        <Button type="primary" onClick={props.showModal} icon={<PlusIcon />}>
            Create Deck
        </Button>
    );
};