import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BookService } from "@/services/BookService";
import type { Book } from "@/@types/book";

type BooksPage = { data: Book[]; total: number };

export const useBooks = (queryParam: string = "fiction", limitParam: number = 5) => {
    const queryClient = useQueryClient();

    const booksQuery = useInfiniteQuery<BooksPage, Error>({
        queryKey: ["books", queryParam, limitParam],
        queryFn: async ({ pageParam = 1 }) =>
            BookService.getAll(pageParam as number, limitParam, queryParam),
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return nextPage <= Math.ceil(lastPage.total / limitParam) ? nextPage : undefined;
        },
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5,
    });

    const addBookMutation = useMutation({
        mutationFn: BookService.create,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
    });

    const updateBookMutation = useMutation({
        mutationFn: BookService.update,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
    });

    const patchBookMutation = useMutation({
        mutationFn: ({ id, partial }: { id: string; partial: Partial<Book> }) =>
            BookService.patch(id, partial),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
    });

    const deleteBookMutation = useMutation({
        mutationFn: (id: string) => BookService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
    });

    return {
        books: booksQuery.data?.pages.flatMap((page: BooksPage) => page.data) || [],
        total: booksQuery.data?.pages?.[0]?.total || 0,
        hasNextPage: booksQuery.hasNextPage,
        fetchNextPage: booksQuery.fetchNextPage,
        loading: booksQuery.isLoading,
        error: booksQuery.error?.message,

        addBook: addBookMutation.mutateAsync,
        updateBook: updateBookMutation.mutateAsync,
        patchBook: patchBookMutation.mutateAsync,
        deleteBook: deleteBookMutation.mutateAsync,
    };
};
