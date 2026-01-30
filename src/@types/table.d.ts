export interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => ReactNode);
    width?: string;
}

