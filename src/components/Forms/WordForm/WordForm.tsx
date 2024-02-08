import { Button, Form, Input, Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

export const WordForm = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="horizontal"
            autoComplete="off"
        >
            <Form.Item
                label="Word"
                name="word"
                rules={[{ required: true, message: 'Please input your Word!' }]}
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