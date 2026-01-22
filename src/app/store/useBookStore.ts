import { create } from "zustand";
import type { Book } from "@/@types/book";
import { BookService } from "@/services/bookService";

interface BookStoreState {
    books: Book[];
    total: number;
    page: number;
    limit: number;
    loading: boolean;
    error?: string;

    fetchBooks: (page?: number, limit?: number) => Promise<void>;
    addBook: (book: Omit<Book, "id">) => Promise<void>;
    updateBook: (book: Book) => Promise<void>;
    patchBook: (id: number, partial: Partial<Book>) => Promise<void>;
    deleteBook: (id: number) => Promise<void>;

    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
}

const STORAGE_KEY = "books_inventory";

const loadBooksFromStorage = (): Book[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? (JSON.parse(stored) as Book[]) : [];
    } catch {
        return [];
    }
};

const saveBooksToStorage = (books: Book[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

export const useBookStore = create<BookStoreState>((set, get) => ({
    books: loadBooksFromStorage(),
    total: 0,
    page: 1,
    limit: 5,
    loading: false,
    error: undefined,

    fetchBooks: async (page = get().page, limit = get().limit) => {
        set({ loading: true, error: undefined });
        try {
            const res = await BookService.getAll(page, limit);
            set({ books: res.data, total: res.total, page, limit });
            saveBooksToStorage(res.data);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            set({ error: message });
        } finally {
            set({ loading: false });
        }
    },

    // CRUD
    addBook: async (book) => {
        set({ loading: true, error: undefined });
        try {
            const newBook = await BookService.create(book);
            const updatedBooks = [...get().books, newBook];
            set({ books: updatedBooks, total: get().total + 1 });
            saveBooksToStorage(updatedBooks);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            set({ error: message });
        } finally {
            set({ loading: false });
        }
    },

    updateBook: async (book) => {
        set({ loading: true, error: undefined });
        try {
            const updated = await BookService.update(book);
            const updatedBooks = get().books.map((b) =>
                b.id === updated.id ? updated : b
            );
            set({ books: updatedBooks });
            saveBooksToStorage(updatedBooks);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            set({ error: message });
        } finally {
            set({ loading: false });
        }
    },

    patchBook: async (id, partial) => {
        set({ loading: true, error: undefined });
        try {
            const updated = await BookService.patch(id, partial);
            const updatedBooks = get().books.map((b) =>
                b.id === updated.id ? updated : b
            );
            set({ books: updatedBooks });
            saveBooksToStorage(updatedBooks);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            set({ error: message });
        } finally {
            set({ loading: false });
        }
    },

    deleteBook: async (id) => {
        set({ loading: true, error: undefined });
        try {
            await BookService.delete(id);
            const updatedBooks = get().books.filter((b) => b.id !== id);
            set({ books: updatedBooks, total: get().total - 1 });
            saveBooksToStorage(updatedBooks);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            set({ error: message });
        } finally {
            set({ loading: false });
        }
    },

    setPage: (page: number) => {
        set({ page });
        get().fetchBooks(page, get().limit);
    },

    setLimit: (limit: number) => {
        set({ limit, page: 1 });
        get().fetchBooks(1, limit);
    },
}));
