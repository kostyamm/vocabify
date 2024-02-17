import { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { useYupValidator } from '../../hooks/useYupValidator.ts';
import { InferType, object, string } from 'yup';

const cardFromSchema = object().shape({
    frontSide: string().required(),
    backSide: string().required(),
});

export type CardFromSchema = InferType<typeof cardFromSchema>

type CardModalProps = {
    open: boolean;
    hideModal: () => void;
    title: string;
    onConfirm: (form: CardFromSchema) => void;
    initialValues?: CardFromSchema;
}

export const CardModal = ({ open, hideModal, title, onConfirm, initialValues }: CardModalProps) => {
    const [form] = Form.useForm<CardFromSchema>();
    const { yupSync, formValidate } = useYupValidator(cardFromSchema, form);

    const handleOk = async () => {
        const isValid = await formValidate();

        if (!isValid) {
            return;
        }

        form.submit();
        hideModal();
    };

    useEffect(() => {
        if (!initialValues || !open) {
            return;
        }

        form.setFieldsValue(initialValues);
    }, [initialValues, open]);

    return (
        <Modal
            title={title}
            open={open}
            okText="Confirm"
            onOk={handleOk}
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
    );
};
