import { CustomIconProps } from './Icon.types.tsx';
import { Icon } from './Icon.tsx';

const CheckSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
             className="lucide lucide-check">
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
};

export const CheckIcon = (props: CustomIconProps) => (
    <Icon children={<CheckSvg />} {...props} />
);