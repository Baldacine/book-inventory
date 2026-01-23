import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookService } from "@/services/BookService";
import type { Book } from "@/@types/book";

type BooksPage = { data: Book[]; total: number };

export const useBooks = (queryParam: string = "fiction", limitParam: number = 5) => {
    const queryClient = useQueryClient();

    const localBooksQuery = useQuery<Book[], Error>({
        queryKey: ["books-local"],
        queryFn: () => BookService.getLocal(),
        staleTime: Infinity,
    });

    const booksQuery = useInfiniteQuery<BooksPage, Error>({
        queryKey: ["books", queryParam, limitParam],
        queryFn: async ({ pageParam = 1 }) =>
            BookService.getAll(pageParam as number, limitParam, queryParam),
        getNextPageParam: (lastPage, allPages) => {
            const totalPages = Math.ceil(lastPage.total / limitParam);
            return allPages.length < totalPages ? allPages.length + 1 : undefined;
        },
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5,
    });

    const combineUniqueBooks = (): Book[] => {
        const combined = [...(localBooksQuery.data || []), ...(booksQuery.data?.pages.flatMap(p => p.data) || [])];
        const uniqueMap = new Map<string, Book>();
        combined.forEach(book => {
            uniqueMap.set(book.id, book);
        });
        return Array.from(uniqueMap.values());
    };

    const addBookMutation = useMutation<Book, Error, Omit<Book, "id">>({
        mutationFn: (bookToAdd) => BookService.create(bookToAdd),
        onSuccess: (newBook) => {
            queryClient.setQueryData<Book[]>(["books-local"], (old = []) => [newBook, ...old]);
        },
    });

    const updateBookMutation = useMutation<Book, Error, Book>({
        mutationFn: (bookToUpdate) => BookService.update(bookToUpdate),
        onSuccess: (updatedBook) => {
            queryClient.setQueryData<Book[]>(["books-local"], (old = []) =>
                old.map((b) => (b.id === updatedBook.id ? updatedBook : b))
            );
            queryClient.setQueryData<{ pages: BooksPage[]; pageParams: number[] }>(
                ["books", queryParam, limitParam],
                (oldData) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        pages: oldData.pages.map((page) => ({
                            ...page,
                            data: page.data.map((b) =>
                                b.id === updatedBook.id ? updatedBook : b
                            ),
                        })),
                    };
                }
            );
        },
    });


    const deleteBookMutation = useMutation<void, Error, string>({
        mutationFn: (idToDelete) => BookService.delete(idToDelete),
        onSuccess: (_, idToDelete) => {
            queryClient.setQueryData<Book[]>(["books-local"], (old = []) =>
                old.filter((b) => b.id !== idToDelete)
            );
            queryClient.setQueryData<{ pages: BooksPage[]; pageParams: number[] }>(
                ["books", queryParam, limitParam],
                (oldData) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        pages: oldData.pages.map((page) => ({
                            ...page,
                            data: page.data.filter((b) => b.id !== idToDelete),
                            total: page.total - 1,
                        })),
                    };
                }
            );
        },
    });

    const combinedBooks = combineUniqueBooks();

    return {
        books: combinedBooks,
        total: (localBooksQuery.data?.length || 0) + (booksQuery.data?.pages[0]?.total || 0),
        hasNextPage: booksQuery.hasNextPage,
        fetchNextPage: booksQuery.fetchNextPage,
        loading: booksQuery.isLoading || localBooksQuery.isLoading,
        error: booksQuery.error?.message || localBooksQuery.error?.message,

        addBook: addBookMutation.mutateAsync,
        updateBook: updateBookMutation.mutateAsync,
        deleteBook: deleteBookMutation.mutateAsync,
    };
};
