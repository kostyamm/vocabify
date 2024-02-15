import { ButtonProps } from "antd"

export type OpenButton = Omit<ButtonProps, 'onClick'>

export type AddGroupModalProps = {
    openButtonProps?: OpenButton
}

export type OpenButtonProps = {
    openButtonProps?: OpenButton,
    showModal: () => void
}
