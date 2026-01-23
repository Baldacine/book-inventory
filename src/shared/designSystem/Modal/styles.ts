import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease-out;
  backdrop-filter: blur(4px);
  padding: ${({ theme }) => theme.spacing.md};
`;

export const ModalContainer = styled.div<{
  $width?: string | number;
  $height?: string | number;
  $maxWidth?: string | number;
  $maxHeight?: string | number;
}>`
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  
  width: ${({ $width }) => (typeof $width === 'number' ? `${$width}px` : $width || '90%')};
  height: ${({ $height }) => (typeof $height === 'number' ? `${$height}px` : $height || 'auto')};
  max-width: ${({ $maxWidth }) => (typeof $maxWidth === 'number' ? `${$maxWidth}px` : $maxWidth || '500px')};
  max-height: ${({ $maxHeight }) => (typeof $maxHeight === 'number' ? `${$maxHeight}px` : $maxHeight || '90vh')};
  
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: ${slideUp} 0.3s ease-out;
  position: relative;
  overflow: hidden;
`;

export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};

  h2 {
    color: ${({ theme }) => theme.colors.text};
    font-size: clamp(1rem, 2.5vw, 1.2rem); 
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    margin: 0;
  }
`;

export const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto; 
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
`;

export const ModalFooter = styled.footer`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.gray100};
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.gray100}33;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSizes['3xl']};
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  
  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;
