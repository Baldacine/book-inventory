import type { Book } from "@/@types/book";
import { books as mockBooks } from "./mocks/books";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const getAll = async (page = 1, limit = 5): Promise<{ data: Book[]; total: number }> => {
    await delay(300);
    const total = mockBooks.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = mockBooks.slice(start, end);
    return { data, total };
};

export const get = async (id: number): Promise<Book | undefined> => {
    await delay(300);
    return mockBooks.find((b) => b.id === id);
};

export const post = async (book: Omit<Book, "id">): Promise<Book> => {
    await delay(300);
    const newBook: Book = { ...book, id: mockBooks.length + 1 };
    mockBooks.push(newBook);
    return newBook;
};

export const put = async (book: Book): Promise<Book> => {
    await delay(300);
    const index = mockBooks.findIndex((b) => b.id === book.id);
    if (index === -1) throw new Error("Book not found");
    mockBooks[index] = book;
    return book;
};

export const patch = async (id: number, partial: Partial<Book>): Promise<Book> => {
    await delay(300);
    const index = mockBooks.findIndex((b) => b.id === id);
    if (index === -1) throw new Error("Book not found");
    mockBooks[index] = { ...mockBooks[index], ...partial };
    return mockBooks[index];
};

export const del = async (id: number): Promise<void> => {
    await delay(300);
    const index = mockBooks.findIndex((b) => b.id === id);
    if (index === -1) throw new Error("Book not found");
    mockBooks.splice(index, 1);
};
