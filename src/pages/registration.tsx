import { object, string, InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button, Grid, Link, Paper, Stack, TextField, Typography } from '@mui/material';
import { useCallback } from 'react';

const registrationFormSchema = object({
    email: string().required().email(),
    username: string().required(),
    password: string().required().min(5),
    confirmPassword: string().required().min(5),
})

type RegistrationFormSchema = InferType<typeof registrationFormSchema>;

export const Registration = () => {
    const { handleSubmit, register, formState } = useForm({
        mode: 'all',
        defaultValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        },
        resolver: yupResolver(registrationFormSchema),
    });
    const { errors } = formState;

    const onSubmit = useCallback((values: RegistrationFormSchema) => {
        console.log(values);
    }, []);
    return (
        <Stack maxWidth={500} sx={{ mx: 'auto', mt: 5 }}>
            <Paper sx={{ px: 3, py: 4 }}>
                <Typography variant="h1" gutterBottom={true}>
                    Sign up
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
                                error={!!errors.username}
                                label="Username"
                                type="text"
                                variant="outlined"
                                helperText={errors.username?.message}
                                {...register('username')}
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
                            <TextField
                                fullWidth
                                error={!!errors.confirmPassword}
                                label="Password confirmation"
                                type="password"
                                variant="outlined"
                                helperText={errors.confirmPassword?.message}
                                {...register('confirmPassword')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align="right">
                                <Link href="/forgot">Forgot password</Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth variant="contained" type="submit">Sign Up</Button>
                            <Typography>
                                Or <Link href="/login">Log in now!</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Stack>
    );
};

