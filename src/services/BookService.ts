import type { Book } from "@/@types/book";
import * as api from "@/services/api/api";
import { BookCreateSchema, BookUpdateSchema, BookSchema } from "@/services/schemas/bookSchema";

export const BookService = {
    getAll: (page = 1, limit = 5) => api.getAll(page, limit),

    getById: async (id: number): Promise<Book> => {
        const book = await api.get(id);
        if (!book) throw new Error("Book not found");
        return book;
    },

    create: async (book: Omit<Book, "id">): Promise<Book> => {
        const parsed = BookCreateSchema.parse(book);
        return api.post(parsed);
    },

    update: async (book: Book): Promise<Book> => {
        if (book.id === undefined) throw new Error("Book id is required for update");
        const parsed = BookUpdateSchema.parse(book);
        return api.put(parsed);
    },

    patch: async (id: number, partial: Partial<Book>): Promise<Book> => {
        const parsed = BookSchema.partial().parse(partial);
        return api.patch(id, parsed);
    },

    delete: async (id: number): Promise<void> => {
        return api.del(id);
    },
};
