export interface ListItem<T> {
    id: string;
    data: T;
}

export interface ListProps<T> {
    items: ListItem<T>[];
    renderItem: (item: T) => React.ReactNode;
    actions?: (item: T) => React.ReactNode;
    noItemsMessage?: string;
}
