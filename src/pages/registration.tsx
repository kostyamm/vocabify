import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Typography } from 'antd';
import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

const { Title } = Typography;

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
            <Title>Sign up</Title>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
            >
                <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined />} placeholder="Username" />
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
            <Form.Item
                label="Confirm password"
                name="confirmPassword"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Flex justify="flex-end">
                    <Link to="/forgot">
                        Forgot password
                    </Link>
                </Flex>
            </Form.Item>

            <Form.Item>
                <Flex vertical>
                    <Button type="primary" htmlType="submit">
                        Sign up
                    </Button>
                    <div>
                        Or <Link to="/login">Log in now!</Link>
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