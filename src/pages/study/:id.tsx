import { ContentHeader } from '../../components/ContentHeader';
import { useParams } from 'react-router-dom';

export const StudyId = () => {
    const { id: deckId } = useParams();

    return (
        <ContentHeader title={`Study ${deckId}`} />
    );
};