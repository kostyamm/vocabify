import { Fragment, useEffect, useState } from 'react';
import { Button, ButtonProps, Form, Input, Modal } from 'antd';
import { useYupValidator } from '../../hooks/useYupValidator.ts';
import { InferType, object, string } from 'yup';
import { PlusIcon } from '../Icons';

const deckFromSchema = object().shape({
    title: string().required(),
});

export type DeckFromSchema = InferType<typeof deckFromSchema>

type DeckModalProps = {
    title: string;
    onConfirm: (form: DeckFromSchema) => void;
    confirmLoading?: boolean;
    initialValues?: DeckFromSchema;
    openButtonProps?: Omit<ButtonProps, 'onClick'>;
}

export const DeckModal = ({ title, onConfirm, confirmLoading, initialValues, openButtonProps }: DeckModalProps) => {
    const [open, setOpen] = useState(false);

    const [form] = Form.useForm<DeckFromSchema>();
    const { yupSync, formValidate } = useYupValidator(deckFromSchema, form);

    const showModal = () => setOpen(true);
    const hideModal = () => setOpen(false);

    const handleOk = async () => {
        const isValid = await formValidate();

        if (!isValid) {
            return;
        }

        form.submit();
        setOpen(false);
    };

    useEffect(() => {
        if (!initialValues) {
            return;
        }

        form.setFieldsValue(initialValues);
    }, [initialValues]);

    return (
        <Fragment>
            <Button type="primary" onClick={showModal} icon={<PlusIcon />} {...openButtonProps}>
                Create Deck
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
                        label="Deck Name"
                        name="title"
                        required
                        rules={[yupSync]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    );
};
