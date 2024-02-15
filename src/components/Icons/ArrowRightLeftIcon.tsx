import { Icon } from './Icon.tsx';
import { CustomIconProps } from './Icon.types.tsx';

const ArrowRightLeftSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
             className="lucide lucide-arrow-right-left">
            <path d="m16 3 4 4-4 4" />
            <path d="M20 7H4" />
            <path d="m8 21-4-4 4-4" />
            <path d="M4 17h16" />
        </svg>
    );
};

export const ArrowRightLeftIcon = (props: CustomIconProps) => (
    <Icon children={<ArrowRightLeftSvg/>} {...props} />
);