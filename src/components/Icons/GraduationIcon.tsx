import Icon from '@ant-design/icons';
import { CustomIconProps } from './types.ts';

export const GraduationSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
             className="lucide lucide-graduation-cap">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
    );
};

export const GraduationIcon = (props: CustomIconProps) => (
    <Icon component={GraduationSvg} {...props} />
);