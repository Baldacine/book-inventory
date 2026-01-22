import styled, { css } from 'styled-components';

interface StyledHeaderProps {
  $isScrolled: boolean;
}

export const StyledHeader = styled.header<StyledHeaderProps>`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
  
  position: sticky;
  top: 0;
  z-index: 1000;
  
  transition: background-color 0.2s ease, box-shadow 0.3s ease;

  ${({ $isScrolled }) =>
    $isScrolled &&
    css`
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid transparent; 
    `
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;