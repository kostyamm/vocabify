import { Icon } from './Icon.tsx';
import { CustomIconProps } from './Icon.types.tsx';

const ChevronRightSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
             className="lucide lucide-chevron-right">
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
};

export const ChevronRightIcon = (props: CustomIconProps) => (
    <Icon children={<ChevronRightSvg />} {...props} />
);