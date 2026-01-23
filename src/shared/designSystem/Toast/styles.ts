import styled, { keyframes, css } from "styled-components";
import type { ToastType } from "./type";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const typeStyles = {
    success: css`
    background-color: ${({ theme }) => theme.colors.success};
    color: #fff;
  `,
    danger: css`
    background-color: ${({ theme }) => theme.colors.danger};
    color: #fff;
  `,
    warning: css`
    background-color: ${({ theme }) => theme.colors.warning};
    color: #000;
  `,
};

export const ToastContainer = styled.div<{ type?: ToastType }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  max-width: 400px;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  z-index: 9999;
  animation: ${fadeIn} 0.2s ease-out;

  ${({ type }) => type && typeStyles[type]}
`;
