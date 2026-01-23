import { Toast } from "@/shared/designSystem/Toast/Toast";
import type { ToastProps, ToastType } from "@/shared/designSystem/Toast/type";
import { useRef, useState } from "react";

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const idRef = useRef(0);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showToast = (
    message: string,
    type: ToastType = "success",
    duration?: number,
  ) => {
    const id = ++idRef.current;

    setToasts((prev) => [
      ...prev,
      { id, message, type, duration, onClose: () => removeToast(id) },
    ]);
  };

  const Toasts = () => (
    <>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </>
  );

  return { showToast, Toasts };
};
