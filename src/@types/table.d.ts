export interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => ReactNode);
}

export interface TableProps<T> {
    columns: readonly Column<T>[];
    data: T[];
    actions?: (row: T) => ReactNode;
}