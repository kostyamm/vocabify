import { object, string, InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button, Grid, Paper, TextField } from '@mui/material';
import { useCallback } from 'react';

const loginFormSchema = object({
    email: string().required().email(),
    password: string().required().min(5),
})

type LoginFormSchema = InferType<typeof loginFormSchema>;

export const Login = () => {
    const { handleSubmit, register, formState } = useForm({
        mode: 'all',
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(loginFormSchema),
    });
    const { errors } = formState;

    const onSubmit = useCallback((values: LoginFormSchema) => {
        console.log(values);
    }, []);
    return (
        <Paper sx={{ root: { height: '100%' } }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={8}>
                    xs=8
                </Grid>
                <Grid item xs={4}>
                    xs=4
                </Grid>
                <Grid item xs={4}>
                    xs=4
                </Grid>
                <Grid item xs={8}>
                    xs=8
                </Grid>
            </Grid>
        </Paper>
        // <form onSubmit={handleSubmit(onSubmit)}>
        //     <TextField
        //         error={!!errors.email}
        //         label="Email"
        //         type="text"
        //         variant="outlined"
        //         helperText={errors.email?.message}
        //         {...register('email')}
        //     />
        //     <TextField
        //         error={!!errors.password}
        //         label="Password"
        //         type="pa"
        //         variant="outlined"
        //         helperText={errors.password?.message}
        //         {...register('password')}
        //     />
        //     <Button variant="outlined" type="submit">Submit</Button>
        // </form>

        // <Form
        //     name="login_form"
        //     className="authForm"
        //     initialValues={{ remember: true }}
        //     onFinish={onFinish}
        // >
        //     <Title>
        //         Log in
        //     </Title>
        //
        //     <Form.Item
        //         name="username"
        //         rules={[{ required: true, message: 'Please input your Username!' }]}
        //     >
        //         <Input prefix={<UserOutlined />} placeholder="Username" size="large" />
        //     </Form.Item>
        //     <Form.Item
        //         name="password"
        //         rules={[{ required: true, message: 'Please input your Password!' }]}
        //     >
        //         <Input
        //             prefix={<LockOutlined />}
        //             type="password"
        //             placeholder="Password"
        //             size="large"
        //         />
        //     </Form.Item>
        //     <Form.Item>
        //         <Form.Item name="remember" valuePropName="checked" noStyle>
        //             <Checkbox >Remember me</Checkbox>
        //         </Form.Item>
        //
        //         <Link className="authFormForgot" to="/forgot">
        //             Forgot password
        //         </Link>
        //     </Form.Item>
        //
        //     <Form.Item>
        //         <Button type="primary" htmlType="submit" className="authFormButton">
        //             Log in
        //         </Button>
        //         Or <Link to="/registration">register now!</Link>
        //     </Form.Item>
        // </Form>
    );
};
