import { GetProps } from 'antd';
import Icon from '@ant-design/icons';

type IconProps = GetProps<typeof Icon>

export type CustomIconProps = Partial<IconProps>