import { useNavigate } from 'react-router-dom';
import { Button, ButtonProps } from 'antd';
import { GraduationIcon } from '../Icons';

type LearnButtonProps = Omit<ButtonProps, 'icon' | 'onClick'> & { itemId: string | number }

export const LearnButton = ({ itemId, ...buttonProps }: LearnButtonProps) => {
    const navigate = useNavigate();

    return (
        <Button
            icon={<GraduationIcon key="learn" />}
            onClick={(event) => {
                event.stopPropagation();
                navigate(`/learn/${itemId}`);
            }}
            {...buttonProps}
        >
            Learn
        </Button>
    );
};