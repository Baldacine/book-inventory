import { create } from "zustand";

interface BookStoreState {
    page: number;
    limit: number;
    query: string;

    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setQuery: (query: string) => void;
}

export const useBookStore = create<BookStoreState>((set) => ({
    page: 1,
    limit: 10,
    query: "fiction",

    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit }),
    setQuery: (query) => set({ query, page: 1 }),
}));
