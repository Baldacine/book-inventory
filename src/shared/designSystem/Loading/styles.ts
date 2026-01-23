import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 12px;
`;

export const Spinner = styled.div`
  border: 4px solid ${({ theme }) => theme.colors.gray300};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 1s linear infinite;
`;

export const SkeletonBox = styled.div`
  width: 100%;
  max-width: 600px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
`;
