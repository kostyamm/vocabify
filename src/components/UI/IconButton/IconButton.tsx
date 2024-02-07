import { Button, Tooltip } from 'antd';
import { CSSProperties } from 'react';
import { ButtonProps } from 'antd';
import { TooltipProps } from 'antd/es/tooltip';

type IconButton = ButtonProps & { tooltipProps?: TooltipProps }

export const IconButton = (props: IconButton) => {
    return (
        <Tooltip {...props.tooltipProps}>
            <Button type="primary" shape="circle" style={iconButtonStyle} {...props} />
        </Tooltip>
    );
};

const iconButtonStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};