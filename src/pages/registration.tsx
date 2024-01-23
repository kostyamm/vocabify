import { object, string, InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                error={!!errors.email}
                label="Email"
                type="text"
                variant="outlined"
                helperText={errors.email?.message}
                {...register('email')}
            />
            <TextField
                error={!!errors.username}
                label="Username"
                type="text"
                variant="outlined"
                helperText={errors.username?.message}
                {...register('username')}
            />
            <TextField
                error={!!errors.password}
                label="Password"
                type="password"
                variant="outlined"
                helperText={errors.password?.message}
                {...register('password')}
            />
            <TextField
                error={!!errors.confirmPassword}
                label="Password confirmation"
                type="password"
                variant="outlined"
                helperText={errors.confirmPassword?.message}
                {...register('confirmPassword')}
            />
            <Button variant="outlined" type="submit">Submit</Button>
        </form>
    );
};

