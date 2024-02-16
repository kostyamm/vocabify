import { useParams } from 'react-router-dom';
import { Container } from '../../components/Container';

export const StudyId = () => {
    const { id: deckId } = useParams();

    return (
        <Container.Header title={`Study ${deckId}`} />
    );
};