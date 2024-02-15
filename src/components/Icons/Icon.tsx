import { IconProps } from './Icon.types.tsx';

export const Icon = ({ children, style }: IconProps) => {
    return (
        <span className="anticon" style={style}>
            {children}
        </span>
    );
};