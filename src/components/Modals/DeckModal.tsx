import { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { useYupValidator } from '../../hooks/useYupValidator.ts';
import { InferType, object, string } from 'yup';

const deckFromSchema = object().shape({
    title: string().required(),
});

export type DeckFromSchema = InferType<typeof deckFromSchema>

type DeckModalProps = {
    open: boolean;
    hideModal: () => void;
    title: string;
    onConfirm: (form: DeckFromSchema) => void;
    initialValues?: DeckFromSchema;
}

export const DeckModal = ({ open, hideModal, title, onConfirm, initialValues }: DeckModalProps) => {
    const [form] = Form.useForm<DeckFromSchema>();
    const { yupSync, formValidate } = useYupValidator(deckFromSchema, form);

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
                    label="Deck Name"
                    name="title"
                    required
                    rules={[yupSync]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
