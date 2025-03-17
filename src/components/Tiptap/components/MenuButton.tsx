import { Button, ButtonProps, Tooltip, TooltipProps } from "antd";

interface MenuButtonProps extends ButtonProps{
    tooltipTitle: string;
    tooltipProps: TooltipProps;
}

const MenuButton: React.FC<MenuButtonProps> = ({ tooltipTitle, tooltipProps, ...buttonProps }) => {
    return (
        <Tooltip title={tooltipTitle} {...tooltipProps}>
            <Button
                {...buttonProps}
            />
        </Tooltip>
    );
}

export default MenuButton;