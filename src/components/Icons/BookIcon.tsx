import { Icon } from './Icon.tsx';
import { CustomIconProps } from './Icon.types.tsx';

const BookSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
             className="lucide lucide-book-a">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            <path d="m8 13 4-7 4 7" />
            <path d="M9.1 11h5.7" />
        </svg>
    );
};

export const BookIcon = (props: CustomIconProps) => (
    <Icon children={<BookSvg />} {...props} />
);