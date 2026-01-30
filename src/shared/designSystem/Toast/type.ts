export type ToastType = "success" | "danger" | "warning";

export interface ToastProps {
    id: number;
    message: string;
    type?: ToastType;
    duration?: number;
    onClose?: () => void;
}
