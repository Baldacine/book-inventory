import type { ReactNode } from "react";
import { TableWrapper, TableElement, PaginationWrapper } from "./styles";
import type { TableProps } from "@/@types/table";
import { Button } from "../Button/Button";

export function Table<T extends { id: number }>({
  columns,
  data,
  actions,
  page,
  limit,
  total,
  onPageChange,
}: TableProps<T> & {
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
}) {
  const totalPages = Math.ceil(total / limit);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <TableWrapper>
        <TableElement>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.header}>{col.header}</th>
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
                  return <td key={String(col.accessor)}>{value}</td>;
                })}
                {actions && <td>{actions(row)}</td>}
              </tr>
            ))}
          </tbody>
        </TableElement>
      </TableWrapper>
      {totalPages > 1 && (
        <PaginationWrapper>
          <Button
            size="small"
            variant="circle"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            &lt;
          </Button>

          {pages.map((p) => (
            <Button
              key={p}
              size="small"
              variant="circle"
              disabled={p === page}
              onClick={() => onPageChange(p)}
            >
              {p}
            </Button>
          ))}

          <Button
            size="small"
            variant="circle"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
          >
            &gt;
          </Button>
        </PaginationWrapper>
      )}
    </>
  );
}
