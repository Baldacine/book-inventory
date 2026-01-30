import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ToastContainer } from "./styles";
import type { ToastProps } from "./type";

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return createPortal(
    <ToastContainer type={type}>{message}</ToastContainer>,
    document.body,
  );
};
