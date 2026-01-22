import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
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
    font-weight: 600;
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

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end; /* alinhado à direita */
  align-items: center;
  margin-top: 16px;
  gap: 8px;
`;


