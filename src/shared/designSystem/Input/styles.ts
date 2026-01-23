import styled, { css } from "styled-components";

interface StyledFieldProps {
  hasError?: boolean;
}

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
   font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin-bottom: 4px;
`;

export const Required = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  padding-left: 5px;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  margin-top: 2px;
`;

export const StyledInput = styled.input<StyledFieldProps>`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.gray300};
    border-color: ${({ theme }) => theme.colors.gray300};
    cursor: no-drop;
  }

  ${({ hasError, theme }) =>
    hasError &&
    css`
      border-color: ${theme.colors.danger};
    `}
`;

export const StyledTextarea = styled.textarea<StyledFieldProps>`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  width: 100%;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  ${({ hasError, theme }) =>
    hasError &&
    css`
      border-color: ${theme.colors.danger};
    `}
`;
