import { CustomIconProps } from './Icon.types.tsx';
import { Icon } from './Icon.tsx';

const SearchSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
             className="lucide lucide-search">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
};

export const SearchIcon = (props: CustomIconProps) => (
    <Icon children={<SearchSvg />} {...props} />
);