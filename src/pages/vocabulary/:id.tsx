import { useParams } from 'react-router-dom';
import { Fragment } from 'react';

export const VocabularyDetail = () => {
    const { id } = useParams()

    return (
        <Fragment>
            Vocabulary {id}
        </Fragment>
    );
};
