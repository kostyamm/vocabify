import { useNavigate } from 'react-router-dom';
import { Button, ButtonProps } from 'antd';
import { GraduationIcon } from '../Icons';

type StudyButtonProps = Omit<ButtonProps, 'icon' | 'onClick'> & { itemId: string | number }

export const StudyButton = ({ itemId, ...buttonProps }: StudyButtonProps) => {
    const navigate = useNavigate();

    return (
        <Button
            icon={<GraduationIcon key="study" />}
            onClick={(event) => {
                event.stopPropagation();
                navigate(`/study/${itemId}`);
            }}
            {...buttonProps}
        >
            Study
        </Button>
    );
};