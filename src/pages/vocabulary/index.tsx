import { Fragment } from 'react';
import { Typography } from '@mui/material';
import { VocabularyControls } from '../../components/Vocabulary';

export const Vocabulary = () => {
    return (
        <Fragment>
            <Typography variant="h1" gutterBottom>Vocabulary</Typography>
            <VocabularyControls />
        </Fragment>
    );
};

