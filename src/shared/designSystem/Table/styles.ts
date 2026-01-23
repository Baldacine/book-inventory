import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  max-height: 600px; 
  overflow-y: auto;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const TableElement = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;

  th,
  td {
    border: 1px solid ${({ theme }) => theme.colors.gray100};
    padding: 12px 16px;
    text-align: left;
  }

  th {
    background-color: ${({ theme }) => theme.colors.gray300};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    position: sticky;
    top: 0;
    z-index: 1;
  }

  tbody tr:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }

  @media (max-width: 768px) {
    th,
    td {
      padding: 8px 12px;
    }
  }
`;

export const LoadMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
`;

export const TotalItems = styled.div`
  text-align: right;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray700};
  margin: 8px 0;
`;
