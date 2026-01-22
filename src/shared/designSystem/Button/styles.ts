import styled, { type DefaultTheme } from 'styled-components';
import type { ButtonVariant, ButtonSize } from './types';

const buttonSizes: Record<ButtonSize, (theme: DefaultTheme) => string> = {
    small: (theme) => `
    height: 32px;
    padding: 0 ${theme.spacing.sm};
    font-size: ${theme.typography.fontSizes.xs};
    font-weight: ${theme.typography.fontWeights.semibold};
  `,
    medium: (theme) => `
    height: 48px;
    padding: 0 ${theme.spacing.md};
    font-size:  ${theme.typography.fontSizes.sm};
    font-weight: ${theme.typography.fontWeights.semibold};
  `,
    large: (theme) => `
    height: 56px;
    padding: 0 ${theme.spacing.lg || '24px'};
    font-size:  ${theme.typography.fontSizes.md};
    font-weight: ${theme.typography.fontWeights.semibold};
  `,
};

const buttonVariants: Record<ButtonVariant, (theme: DefaultTheme) => string> = {
    primary: (theme) => `
        background: ${theme.colors.primary};
        color: ${theme.colors.white};
        &:hover:not(:disabled) { background: ${theme.colors.primaryDark}; }
    `,
    secondary: (theme) => `
        background: ${theme.colors.secondary};
        color: ${theme.colors.white};
        &:hover:not(:disabled) { background: ${theme.colors.secondaryDark}; }
    `,
    outline: (theme) => `
        background: transparent;
        color: ${theme.colors.primary};
        border: 1px solid ${theme.colors.primary};
        &:hover:not(:disabled) {
            background: ${theme.colors.primary};
            color: ${theme.colors.white};
        }
    `,
    circle: (theme) => `
        background: transparent;
        color: ${theme.colors.primary};
        border: 1px solid ${theme.colors.gray300};
        border-radius: 50%;
        padding: 0;
        aspect-ratio: 1 / 1; 
        &:hover:not(:disabled) {
            background: ${theme.colors.gray100};
            border-color: ${theme.colors.primary};
        }
    `,
};

export const StyledButton = styled.button<{ $variant: ButtonVariant; $size: ButtonSize }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.sm};
    
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    border: none;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.2s ease;

    ${({ $size, theme }) => buttonSizes[$size](theme)};

    ${({ $variant, theme }) => buttonVariants[$variant](theme)};

    &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    &:active:not(:disabled) {
        transform: scale(0.96);
    }
`;
