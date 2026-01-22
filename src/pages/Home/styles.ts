import styled from "styled-components";

export const Container = styled.div`
  padding: 24px;
`;

export const AreaTitleButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const LoadingMessage = styled.div`
  padding: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

export const ErrorMessage = styled.div`
  padding: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.danger};
  font-weight: bold;
`;
