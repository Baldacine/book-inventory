import { useBookStore } from "@/app/store/useBookStore";

export const useBooks = () => {
    const books = useBookStore((state) => state.books);
    const total = useBookStore((state) => state.total);
    const page = useBookStore((state) => state.page);
    const limit = useBookStore((state) => state.limit);
    const loading = useBookStore((state) => state.loading);
    const error = useBookStore((state) => state.error);

    const fetchBooks = useBookStore((state) => state.fetchBooks);
    const addBook = useBookStore((state) => state.addBook);
    const updateBook = useBookStore((state) => state.updateBook);
    const patchBook = useBookStore((state) => state.patchBook);
    const deleteBook = useBookStore((state) => state.deleteBook);
    const setPage = useBookStore((state) => state.setPage);
    const setLimit = useBookStore((state) => state.setLimit);

    return {
        books,
        total,
        page,
        limit,
        loading,
        error,
        fetchBooks,
        addBook,
        updateBook,
        patchBook,
        deleteBook,
        setPage,
        setLimit,
    };
};
