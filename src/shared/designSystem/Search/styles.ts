import styled from "styled-components";

export const SearchWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin: 12px 0;
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
  }

`;

export const Input = styled.input`
  flex: 1;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  font-size: 14px;
`;

export const ClearButton = styled.button`
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  background-color: ${({ theme }) => theme.colors.gray100};
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`;
