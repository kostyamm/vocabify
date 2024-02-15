import { Icon } from './Icon.tsx';
import { CustomIconProps } from './Icon.types.tsx';

const PlusSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
             className="lucide lucide-plus">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    );
};
export const PlusIcon = (props: CustomIconProps) => (
    <Icon children={<PlusSvg />} {...props} />
);