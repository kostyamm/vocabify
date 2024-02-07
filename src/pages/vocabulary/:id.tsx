import { useNavigate, useParams } from 'react-router-dom';
import { Fragment } from 'react';
import { ContentHeader } from '../../components/UI/ContentHeader';
import { Button } from 'antd';
import { GraduationIcon } from '../../components/Icons';

export const VocabularyDetail = () => {
    const { id: vocabularyId } = useParams();
    const navigate = useNavigate();

    return (
        <Fragment>
            <ContentHeader
                title={`Vocabulary ${vocabularyId}`}
                action={
                    <Button
                        size="large"
                        type="primary"
                        icon={<GraduationIcon key="learn" />}
                        onClick={() => navigate(`/learn`)}
                    >
                        Learn
                    </Button>}
            />
        </Fragment>
    );
};
