import { Icon } from './Icon.tsx';
import { CustomIconProps } from './Icon.types.tsx';

const ListPlusSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
             className="lucide lucide-list-plus">
            <path d="M11 12H3" />
            <path d="M16 6H3" />
            <path d="M16 18H3" />
            <path d="M18 9v6" />
            <path d="M21 12h-6" />
        </svg>
    );
};

export const ListPlusIcon = (props: CustomIconProps) => (
    <Icon children={<ListPlusSvg />} {...props} />
);