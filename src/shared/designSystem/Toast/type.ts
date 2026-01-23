export type ToastType = "success" | "danger" | "warning";

export interface ToastProps {
    message: string;
    type?: ToastType;
    duration?: number;
    onClose?: () => void;
}
