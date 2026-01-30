import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Book } from "@/@types/book";
import type { Column } from "@/@types/table";

import { useBooks } from "@/hooks/useBooks";
import { Button } from "@/shared/designSystem/Button/Button";
import { Container, AreaTitleButton, ErrorMessage } from "./styles";
import { BookFormModal } from "./components/BookFormModal/BookFormModal";
import { Edit2, Trash, Eye } from "lucide-react";
import { Table } from "@/shared/designSystem/Table/Table";
import { useToast } from "@/hooks/useToast";
import { List } from "@/shared/designSystem/List/List";
import { useResponsive } from "@/hooks/useResponsive";
import { Search } from "@/shared/designSystem/Search/Search";

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
          style={{
            cursor: "pointer",
            textDecoration: "none",
            color: "#007bff",
            fontSize: "14px",
          }}
          onClick={() => {
            navigate(`/books/${book.id}`, { state: { book } });
          }}
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
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        {
          root: null,
          rootMargin: "100px",
          threshold: 0,
        },
      );

      if (node) observerRef.current.observe(node);
    },
    [loading, fetchNextPage, hasNextPage],
  );

  const removeBook = async (book: Book) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${book.title}"?`,
    );
    if (!confirmDelete) return;

    try {
      await deleteBook(book.id);
      showToast(`Book "${book.title}" deleted successfully`, "success");
    } catch (error) {
      console.error("Error deleting book:", error);
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

      {error && <ErrorMessage>{error}</ErrorMessage>}

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
            <>
              <Button
                size="small"
                variant="circle"
                onClick={() =>
                  navigate(`/books/${book.id}`, { state: { book } })
                }
              >
                <Eye size={14} />
              </Button>
              <Button
                size="small"
                variant="circle"
                onClick={() => {
                  setSelectedBook(book);
                  setIsModalOpen(true);
                }}
              >
                <Edit2 size={14} />
              </Button>
              <Button
                size="small"
                variant="circle"
                color="red"
                onClick={() => removeBook(book)}
              >
                <Trash size={14} />
              </Button>
            </>
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
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                size="small"
                variant="circle"
                onClick={() =>
                  navigate(`/books/${book.id}`, { state: { book } })
                }
                title="View Book"
              >
                <Eye size={14} />
              </Button>
              <Button
                size="small"
                variant="circle"
                onClick={() => {
                  setSelectedBook(book);
                  setIsModalOpen(true);
                }}
                title="Edit Book"
              >
                <Edit2 size={14} />
              </Button>
              <Button
                size="small"
                variant="circle"
                color="red"
                style={{ color: "red" }}
                onClick={() => removeBook(book)}
                title="Delete Book"
              >
                <Trash size={14} />
              </Button>
            </div>
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
          onSave={async (savedBook: Book) => {
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
