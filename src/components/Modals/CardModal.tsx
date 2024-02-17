import { Fragment, useEffect, useState } from 'react';
import { Button, ButtonProps, Form, Input, Modal } from 'antd';
import { useYupValidator } from '../../hooks/useYupValidator.ts';
import { InferType, object, string } from 'yup';
import { PlusIcon } from '../Icons';

const cardFromSchema = object().shape({
    frontSide: string().required(),
    backSide: string().required(),
});

export type CardFromSchema = InferType<typeof cardFromSchema>

type CardModalProps = {
    title: string;
    onConfirm: (form: CardFromSchema) => void;
    confirmLoading?: boolean;
    initialValues?: CardFromSchema;
    openButtonProps?: Omit<ButtonProps, 'onClick'>;
}

export const CardModal = ({ title, onConfirm, confirmLoading, initialValues, openButtonProps }: CardModalProps) => {
    const [open, setOpen] = useState(false);

    const [form] = Form.useForm<CardFromSchema>();
    const { yupSync, formValidate } = useYupValidator(cardFromSchema, form);

    const showModal = () => setOpen(true);
    const hideModal = () => setOpen(false);

    const handleOk = async () => {
        const isValid = await formValidate();

        if (!isValid) {
            return;
        }

        form.submit();
    };

    useEffect(() => {
        if (open && !confirmLoading) {
            setOpen(false);
        }
    }, [confirmLoading]);

    useEffect(() => {
        if (!initialValues) {
            return;
        }

        form.setFieldsValue(initialValues);
    }, [initialValues]);

    return (
        <Fragment>
            <Button type="primary" onClick={showModal} icon={<PlusIcon />} {...openButtonProps}>
                Create Card
            </Button>

            <Modal
                title={title}
                open={open}
                okText="Create"
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={hideModal}
                afterClose={() => form.resetFields()}
                styles={{ header: { marginBottom: 24 } }}
            >
                <Form
                    form={form}
                    onFinish={onConfirm}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Form.Item
                        label="Front side"
                        name="frontSide"
                        required
                        rules={[yupSync]}
                    >
                        <Input.TextArea autoSize={{ minRows: 4, maxRows: 4 }} placeholder="Cześć" />
                    </Form.Item>
                    <Form.Item
                        label="Back side"
                        name="backSide"
                        required
                        rules={[yupSync]}
                    >
                        <Input.TextArea autoSize={{ minRows: 4, maxRows: 4 }} placeholder="Hi" />
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    );
};
