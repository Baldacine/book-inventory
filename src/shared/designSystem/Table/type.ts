import type { Column } from "@/@types/table";
import type { ReactNode } from "react";


export interface TableProps<T extends { id: string }> {
    columns: Column<T>[];
    data: T[];
    actions?: (row: T) => ReactNode;
    loading?: boolean;
    loadMore?: () => void;
    hasMore?: boolean;
    loadMoreRef?: (node: HTMLDivElement | null) => void;
    total: number;
}
