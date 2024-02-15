import { Icon } from './Icon.tsx';
import { CustomIconProps } from './Icon.types.tsx';

const SunSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor"
             strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
        </svg>
    );
};

export const SunIcon = (props: CustomIconProps) => (
    <Icon children={<SunSvg />} {...props} />
);