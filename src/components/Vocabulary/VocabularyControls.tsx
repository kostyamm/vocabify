import { useCallback } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType, object, string } from 'yup';

export const VocabularyControls = () => {
    return (
        <GroupForm />
    );
};

const createGroupFormSchema = object({
    groupName: string().required(),
});

type CreateGroupFormSchema = InferType<typeof createGroupFormSchema>;

const GroupForm = () => {
    const { handleSubmit, register, formState } = useForm({
        mode: 'all',
        defaultValues: {
            groupName: '',
        },
        resolver: yupResolver(createGroupFormSchema),
    });
    const { errors } = formState;

    const onSubmit = useCallback((values: CreateGroupFormSchema) => {
        console.log(values);
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="subtitle1" gutterBottom>
                Create group
            </Typography>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        error={!!errors.groupName}
                        label="Name"
                        type="text"
                        variant="outlined"
                        helperText={errors.groupName?.message}
                        {...register('groupName')}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button size="large" type="submit" startIcon={<AddOutlinedIcon />}>
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
