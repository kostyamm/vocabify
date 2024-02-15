import { Icon } from './Icon.tsx';
import { CustomIconProps } from './Icon.types.tsx';

const MoreHorizontalSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
             className="lucide lucide-more-horizontal">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
        </svg>
    );
};
export const MoreHorizontalIcon = (props: CustomIconProps) => (
    <Icon children={<MoreHorizontalSvg />} {...props} />
);