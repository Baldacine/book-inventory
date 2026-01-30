import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
    type InfiniteData,
} from "@tanstack/react-query";
import { BookService } from "@/domain/services/BookService";
import type { Book } from "@/domain/entities/Book";

export type BooksPage = {
    data: Book[];
    total: number;
};

export const useBooks = (query = "fiction", limit = 10) => {
    const queryClient = useQueryClient();

    const localBooksQuery = useQuery<Book[]>({
        queryKey: ["books-local"],
        queryFn: BookService.getLocal,
        staleTime: Infinity,
    });

    const booksQuery = useInfiniteQuery<BooksPage>({
        queryKey: ["books", query, limit],
        initialPageParam: 1,
        queryFn: ({ pageParam }) =>
            BookService.getAll(pageParam as number, limit, query),

        getNextPageParam: (lastPage, pages) => {
            const loaded = pages.reduce((acc, p) => acc + p.data.length, 0);
            return loaded >= lastPage.total ? undefined : pages.length + 1;
        },

        staleTime: 1000 * 60 * 5,
    });

    const books: Book[] = [
        ...(localBooksQuery.data ?? []),
        ...(booksQuery.data?.pages.flatMap((p) => p.data) ?? []),
    ].filter(
        (book, index, self) =>
            index === self.findIndex((b) => b.id === book.id)
    );


    const addBook = useMutation({
        mutationFn: BookService.create,
        onSuccess: (created) => {
            queryClient.setQueryData<Book[]>(["books-local"], (old = []) => [
                created,
                ...old,
            ]);
        },
    });

    const updateBook = useMutation({
        mutationFn: BookService.update,

        onSuccess: (updated) => {
            queryClient.setQueryData<Book[]>(["books-local"], (old = []) =>
                old.map((b) => (b.id === updated.id ? updated : b))
            );

            queryClient.setQueriesData<InfiniteData<BooksPage>>(
                { queryKey: ["books"] },
                (data) => {
                    if (!data) return data;

                    return {
                        ...data,
                        pages: data.pages.map((page) => ({
                            ...page,
                            data: page.data.map((b) =>
                                b.id === updated.id ? updated : b
                            ),
                        })),
                    };
                }
            );
        },
    });

    const deleteBook = useMutation({
        mutationFn: BookService.delete,

        onSuccess: (_, id) => {
            queryClient.setQueryData<Book[]>(["books-local"], (old = []) =>
                old.filter((b) => b.id !== id)
            );

            queryClient.setQueriesData<InfiniteData<BooksPage>>(
                { queryKey: ["books"] },
                (data) => {
                    if (!data) return data;

                    return {
                        ...data,
                        pages: data.pages.map((page) => ({
                            ...page,
                            data: page.data.filter((b) => b.id !== id),
                            total: page.total - 1,
                        })),
                    };
                }
            );
        },
    });

    return {
        books,
        total: (localBooksQuery.data?.length || 0) + (booksQuery.data?.pages[0]?.total || 0),
        hasNextPage: booksQuery.hasNextPage,
        fetchNextPage: booksQuery.fetchNextPage,
        loading: booksQuery.isLoading || localBooksQuery.isLoading,
        error: booksQuery.error ?? localBooksQuery.error,

        addBook: addBook.mutateAsync,
        updateBook: updateBook.mutateAsync,
        deleteBook: deleteBook.mutateAsync,
    };
};
