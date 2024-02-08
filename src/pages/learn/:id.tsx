import { ContentHeader } from '../../components/UI/ContentHeader';
import { useParams } from 'react-router-dom';

export const Index = () => {
    const { id: dictionaryId } = useParams();

    return (
        <ContentHeader title={`Learn ${dictionaryId}`} />
    );
};