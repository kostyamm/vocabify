import { CSSProperties, ReactNode } from 'react';

export type CustomIconProps = {
    style?: CSSProperties
}

export type IconProps = CustomIconProps & {
    children: ReactNode
}