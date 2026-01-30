import { create } from "zustand";

interface BookStoreState {
    limit: number;
    query: string;
    setLimit: (limit: number) => void;
    setQuery: (query: string) => void;
}

export const useBookStore = create<BookStoreState>((set) => ({
    limit: 10,
    query: "fiction",

    setLimit: (limit) => set({ limit }),
    setQuery: (query) => set({ query }),
}));
