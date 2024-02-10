import { Button, Form, Input, Select, Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { object, string, InferType } from 'yup';
import { useYupValidator } from '../../../hooks/useYupValidator.ts';
import { useState } from 'react';

const wordFormSchema = object().shape({
    word: string().required(),
});

type WordFormSchema = InferType<typeof wordFormSchema>

export const WordForm = () => {
    const [form] = Form.useForm<WordFormSchema>();
    const { yupSync } = useYupValidator(wordFormSchema, form);

    const [wordValue, setWordValue] = useState([]);
    const [translationValue, setTranslationValue] = useState([]);

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            layout="horizontal"
            autoComplete="off"
        >
            <Space.Compact>
                <Select
                    style={{ minWidth: 150, width: 150 }}
                    value={wordValue}
                    onChange={setWordValue}
                    showSearch
                    placeholder="Word"
                    options={[
                        { value: 'RU', label: 'Russian' },
                        { value: 'EN', label: 'English' },
                        { value: 'PL', label: 'Polish' },
                        { value: 'BE', label: 'Belarusian' },
                    ]}
                />
                <Select
                    style={{ minWidth: 150, width: 150 }}
                    value={translationValue}
                    onChange={setTranslationValue}
                    showSearch
                    placeholder="Translation"
                    options={[
                        { value: 'RU', label: 'Russian' },
                        { value: 'EN', label: 'English' },
                        { value: 'PL', label: 'Polish' },
                        { value: 'BE', label: 'Belarusian' },
                    ]}
                />
            </Space.Compact>
            <Form.Item
                label="Word"
                name="word"
                required
                rules={[yupSync]}
            >
                <Space.Compact>
                    <Input placeholder="Hi" />

                    <Button icon={<PlusCircleOutlined />} htmlType="submit">
                        Add
                    </Button>
                </Space.Compact>
            </Form.Item>
        </Form>
    );
};