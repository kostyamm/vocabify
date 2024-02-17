import { IconProps } from './Icon.types.tsx';

export const Icon = ({ children, style }: IconProps) => {
    return (
        <span className="anticon ant-dropdown-menu-item-icon" style={style}>
            {children}
        </span>
    );
};