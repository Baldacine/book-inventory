import { device } from "@/theme";
import styled from "styled-components";

export const TableWrapper = styled.div<{ height: number }>`
  width: 100%;
  max-height: ${({ height }) => height}px;
  overflow-y: auto;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  @media ${device.mobile} {
    max-height: ${({ height }) => height / 2}px; 
  }

  @media ${device.tablet} {
    max-height: ${({ height }) => (height * 0.75)}px;
  }
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

  @media ${device.mobile} {
    th.title, th.author, th.actions {
      width: auto;
    }
  }

`;

export const LoadMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
`;

export const TotalItems = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray700};
  margin: 8px 0;
`;
