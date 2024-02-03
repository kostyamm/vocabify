import { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Paper, Stack, TextField, Typography, Link } from '@mui/material';
import { object, string, InferType } from 'yup';
import { useForm } from 'react-hook-form';

const loginFormSchema = object({
    email: string().required().email(),
    password: string().required().min(5),
});

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
        <Stack maxWidth={500} sx={{ mx: 'auto', mt: 5 }}>
            <Paper sx={{ px: 3, py: 4 }}>
                <Typography variant="h1" gutterBottom={true}>
                    Log in
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                error={!!errors.email}
                                label="Email"
                                type="text"
                                variant="outlined"
                                helperText={errors.email?.message}
                                {...register('email')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                error={!!errors.password}
                                label="Password"
                                type="password"
                                variant="outlined"
                                helperText={errors.password?.message}
                                {...register('password')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align="right">
                                <Link href="/forgot">Forgot password</Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth variant="contained" type="submit">Log In</Button>
                            <Typography>
                                Or <Link href="/registration">Sign up now!</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Stack>
    );
};
