import {
    BookCreateSchema,
    BookUpdateSchema,
    BookSchema,
} from "@/domain/schemas/bookSchema";

import { booksApi } from "@/services/api/books.api";
import type { Book } from "../entities/Book";

export const BookService = {
    getAll: (page = 1, limit = 10, query = "fiction") =>
        booksApi.getAll(page, limit, query),

    getLocal: () => booksApi.getLocalBooks(),

    getById: async (id: string): Promise<Book> => {
        const book = await booksApi.get(id);
        if (!book) throw new Error("Book not found");
        return book;
    },

    create: async (book: Omit<Book, "id">): Promise<Book> => {
        const parsed = BookCreateSchema.parse(book);
        return booksApi.post(parsed);
    },

    update: async (book: Book): Promise<Book> => {
        const parsed = BookUpdateSchema.parse(book);
        return booksApi.put(parsed);
    },

    patch: async (id: string, partial: Partial<Book>): Promise<Book> => {
        const parsed = BookSchema.partial().parse(partial);
        return booksApi.patch(id, parsed);
    },

    delete: async (id: string): Promise<void> => booksApi.del(id),
};
