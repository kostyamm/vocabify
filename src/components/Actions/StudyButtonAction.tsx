import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { GraduationIcon } from '../Icons';

export const StudyButtonAction = ({ deckId }: { deckId: number }) => {
    const navigate = useNavigate();

    return (
        <Button
            type="primary"
            icon={<GraduationIcon key="study" />}
            onClick={() => navigate(`/study/${deckId}`)}
        >
            Study
        </Button>
    );
};