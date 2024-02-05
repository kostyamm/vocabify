import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input, Typography } from 'antd';
import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

const { Title } = Typography

export const Login = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            style={formStyle}
        >
            <Title>Log in</Title>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
            >
                <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Flex justify="space-between">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Link to="/forgot">
                        Forgot password
                    </Link>
                </Flex>
            </Form.Item>

            <Form.Item>
                <Flex vertical>
                    <Button type="primary" htmlType="submit">
                        Log in
                    </Button>
                    <div>
                        Or <Link to="/registration">Sign up now!</Link>
                    </div>
                </Flex>
            </Form.Item>
        </Form>
    );
};

const formStyle: CSSProperties = {
    width: '100%',
    maxWidth: 500,
    margin: '0 auto',
};