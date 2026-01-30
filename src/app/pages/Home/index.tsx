import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Column } from "@/@types/table";
import { useBooks } from "@/hooks/useBooks";
import { Button } from "@/shared/designSystem/Button/Button";
import { Container, AreaTitleButton, ErrorMessage } from "./styles";
import { Table } from "@/shared/designSystem/Table/Table";
import { List } from "@/shared/designSystem/List/List";
import { useToast } from "@/hooks/useToast";
import { useResponsive } from "@/hooks/useResponsive";
import { Search } from "@/shared/designSystem/Search/Search";
import { BookActions } from "@/components/BookActions";
import { BookFormModal } from "@/components/BookForm/BookFormModal";
import type { Book } from "@/domain/entities/Book";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    books,
    total,
    loading,
    error,
    hasNextPage,
    fetchNextPage,
    addBook,
    updateBook,
    deleteBook,
  } = useBooks();
  const { showToast, Toasts } = useToast();
  const { isMobile } = useResponsive();

  const [selectedBook, setSelectedBook] = useState<Book | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const columns: Column<Book>[] = [
    {
      header: "Title",
      accessor: (book) => (
        <span
          style={{ cursor: "pointer", color: "#007bff" }}
          onClick={() => navigate(`/books/${book.id}`, { state: { book } })}
        >
          {book.title}
        </span>
      ),
      width: "30%",
    },
    { header: "Author", accessor: "author", width: "40%" },
  ];

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
        },
        { root: null, rootMargin: "100px", threshold: 0 },
      );
      if (node) observerRef.current.observe(node);
    },
    [loading, fetchNextPage, hasNextPage],
  );

  const removeBook = async (book: Book) => {
    if (!window.confirm(`Are you sure you want to delete "${book.title}"?`))
      return;
    try {
      await deleteBook(book.id);
      showToast(`Book "${book.title}" deleted successfully`, "success");
    } catch {
      showToast(`Failed to delete "${book.title}"`, "danger");
    }
  };
  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Container>
      <AreaTitleButton>
        <h1>Book Inventory</h1>
        <Button
          size="small"
          onClick={() => {
            setSelectedBook(undefined);
            setIsModalOpen(true);
          }}
        >
          Add New Book
        </Button>
      </AreaTitleButton>

      <Search
        value={search}
        onChange={setSearch}
        placeholder="Search by title or author"
        onClear={() => setSearch("")}
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}

      {isMobile ? (
        <List
          items={filteredBooks.map((b) => ({ id: b.id, data: b }))}
          renderItem={(book: Book) => (
            <>
              <span style={{ fontWeight: 600 }}>{book.title}</span>
              <span>{book.author}</span>
            </>
          )}
          actions={(book: Book) => (
            <BookActions
              book={book}
              onView={(b) => navigate(`/books/${b.id}`, { state: { b } })}
              onEdit={(b) => {
                setSelectedBook(b);
                setIsModalOpen(true);
              }}
              onDelete={removeBook}
            />
          )}
          hasMore={hasNextPage}
          loadMore={fetchNextPage}
          loading={loading}
          noItemsMessage="No books available."
          total={total}
        />
      ) : (
        <Table
          columns={columns}
          data={filteredBooks}
          actions={(book) => (
            <BookActions
              book={book}
              onView={(b) => navigate(`/books/${b.id}`, { state: { b } })}
              onEdit={(b) => {
                setSelectedBook(b);
                setIsModalOpen(true);
              }}
              onDelete={removeBook}
            />
          )}
          loading={loading}
          hasMore={hasNextPage}
          loadMoreRef={loadMoreRef}
          total={total}
        />
      )}

      {isModalOpen && (
        <BookFormModal
          key={selectedBook?.id ?? "new"}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedBook(undefined);
          }}
          book={selectedBook}
          books={books}
          onSave={async (savedBook) => {
            if (selectedBook) {
              await updateBook(savedBook);
            } else {
              await addBook(savedBook);
            }

            setIsModalOpen(false);
            setSelectedBook(undefined);
          }}
          showToast={showToast}
        />
      )}

      <Toasts />
    </Container>
  );
};
