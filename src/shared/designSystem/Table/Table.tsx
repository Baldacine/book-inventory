import type { ReactNode } from "react";
import {
  TableWrapper,
  TableElement,
  LoadMoreWrapper,
  TotalItems,
} from "./styles";
import { Loading } from "../Loading/Loading";
import type { TableProps } from "./type";
import { useTableHeight } from "@/hooks/useTableHeight";

export function Table<T extends { id: string }>({
  columns,
  data,
  actions,
  loading = false,
  hasMore,
  loadMoreRef,
}: TableProps<T>) {
  const tableHeight = useTableHeight(200);

  return (
    <TableWrapper height={tableHeight}>
      <TableElement>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.header} style={{ width: col.width }}>
                {col.header}
              </th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => {
                const value: ReactNode =
                  typeof col.accessor === "function"
                    ? col.accessor(row)
                    : row[col.accessor];
                return (
                  <td key={String(col.accessor)} style={{ width: col.width }}>
                    {value}
                  </td>
                );
              })}
              {actions && <td>{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </TableElement>

      {loading && (
        <LoadMoreWrapper>
          <Loading text="Loading..." />
        </LoadMoreWrapper>
      )}

      {!hasMore && !loading && data.length > 0 && (
        <LoadMoreWrapper>All books loaded</LoadMoreWrapper>
      )}

      {hasMore && !loading && (
        <div ref={loadMoreRef} style={{ height: 1 }}>
          <Loading />
          <TotalItems>{data.length} books loaded</TotalItems>
        </div>
      )}
    </TableWrapper>
  );
}
