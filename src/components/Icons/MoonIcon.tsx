import { Icon } from './Icon.tsx';
import { CustomIconProps } from './Icon.types.tsx';

const MoonSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
             className="lucide lucide-moon">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
    );
};

export const MoonIcon = (props: CustomIconProps) => (
    <Icon children={<MoonSvg />} {...props} />
);