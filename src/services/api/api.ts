import type { Book } from "@/@types/book";
import type { GoogleBookItem, GoogleBooksResponse } from "@/@types/googleBook";
import { ENV } from "@/config/env";
import { calculateBookAge, cleanOverview, formatPublishedDateUS } from "@/utils/helpers";

const STORAGE_KEY = "books_inventory";
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const MAX_TOTAL_ITEMS = 100;

const loadLocalBooks = (): Book[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) as Book[] : [];
    } catch {
        return [];
    }
};

const saveLocalBooks = (books: Book[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

export const getAll = async (
    page = 1,
    limit = 10,
    query = "fiction"
): Promise<{ data: Book[]; total: number }> => {
    await delay(300);

    const localBooks = loadLocalBooks();

    const startIndex = (page - 1) * limit;

    const res = await fetch(
        `${ENV.GOOGLE_BOOKS_URL}?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${limit}`
    );
    const json: GoogleBooksResponse = await res.json();

    const googleBooks: Book[] =
        json.items?.map((item) => {
            const local = localBooks.find((b) => b.id === item.id);
            if (local) return local;

            return {
                id: item.id,
                title: item.volumeInfo.title ?? "Unknown",
                author: item.volumeInfo.authors?.join(", ") ?? "Unknown",
                category: item.volumeInfo.category?.join(", ") ?? "Unknown",
                publishedDate: formatPublishedDateUS(item.volumeInfo.publishedDate),
                publisher: item.volumeInfo.publisher ?? "Unknown",
                overview: cleanOverview(item.searchInfo?.textSnippet) ?? item.volumeInfo.description ?? "",
                age: calculateBookAge(item.volumeInfo.publishedDate),
                thumbnail: item.volumeInfo.imageLinks?.thumbnail ?? "",
                email: `teste-${Date.now()}@gmail.com`,
            };
        }) ?? [];

    const total = Math.min(json.totalItems ?? googleBooks.length, MAX_TOTAL_ITEMS);

    return {
        data: googleBooks,
        total,
    };
};


export const getLocalBooks = async (): Promise<Book[]> => {
    return loadLocalBooks();
};

export const get = async (id: string): Promise<Book | undefined> => {
    await delay(300);
    const local = loadLocalBooks().find((b) => b.id === id);
    if (local) return local;

    const res = await fetch(`${ENV.GOOGLE_BOOKS_URL}/${id}`);
    if (!res.ok) return undefined;

    const item: GoogleBookItem = await res.json();

    return {
        id: item.id,
        title: item.volumeInfo.title ?? "Unknown",
        author: item.volumeInfo.authors?.join(", ") ?? "Unknown",
        category: item.volumeInfo.category?.join(", ") ?? "Unknown",
        publishedDate: formatPublishedDateUS(item.volumeInfo.publishedDate),
        publisher: item.volumeInfo.publisher ?? "Unknown",
        overview: cleanOverview(item.searchInfo?.textSnippet) ?? item.volumeInfo.description ?? "",
        thumbnail: item.volumeInfo.imageLinks?.thumbnail ?? "",
        age: calculateBookAge(item.volumeInfo.publishedDate),
        email: `teste-${Date.now()}@gmail.com`,
    };
};

export const post = async (book: Omit<Book, "id">): Promise<Book> => {
    await delay(300);
    const localBooks = loadLocalBooks();
    const newBook: Book = { ...book, id: `local_${Date.now()}` };
    saveLocalBooks([...localBooks, newBook]);
    return newBook;
};

export const put = async (book: Book): Promise<Book> => {
    await delay(300);
    const localBooks = loadLocalBooks();
    const index = localBooks.findIndex((b) => b.id === book.id);
    if (index === -1) {
        localBooks.push(book);
    } else {
        localBooks[index] = book;
    }

    saveLocalBooks(localBooks);
    return book;
};


export const patch = async (id: string, partial: Partial<Book>): Promise<Book> => {
    await delay(300);
    const localBooks = loadLocalBooks();
    const index = localBooks.findIndex((b) => b.id === id);
    if (index === -1) throw new Error("Book not found");
    localBooks[index] = { ...localBooks[index], ...partial };
    saveLocalBooks(localBooks);
    return localBooks[index];
};

export const del = async (id: string): Promise<void> => {
    await delay(300);
    const localBooks = loadLocalBooks();
    saveLocalBooks(localBooks.filter((b) => b.id !== id));
};
