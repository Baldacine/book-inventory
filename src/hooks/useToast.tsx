/* eslint-disable react-hooks/purity */
import { useState } from "react";
import { Toast } from "@/shared/designSystem/Toast/Toast";
import type { ToastProps, ToastType } from "@/shared/designSystem/Toast/type";

interface InternalToast extends ToastProps {
  id: number;
  type: ToastType;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<InternalToast[]>([]);

  const showToast = (
    message: string,
    type: ToastType = "success",
    duration?: number,
  ) => {
    const id = Date.now();
    setToasts((prev) => [
      ...prev,
      { id, message, type, duration, onClose: () => removeToast(id) },
    ]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
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
