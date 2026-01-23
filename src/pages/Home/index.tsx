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

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { books, loading, error, hasNextPage, fetchNextPage, deleteBook } =
    useBooks();

  const [selectedBook, setSelectedBook] = useState<Book | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: Column<Book>[] = [
    {
      header: "Title",
      accessor: (book) => (
        <span
          style={{
            cursor: "pointer",
            textDecoration: "underline",
            color: "#007bff",
            fontSize: "14px",
          }}
          onClick={() => navigate(`/books/${book.id}`)}
        >
          {book.title}
        </span>
      ),
    },
    { header: "Author", accessor: "author" },
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

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Table
        columns={columns}
        data={books}
        actions={(book) => (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              size="small"
              variant="circle"
              onClick={() => navigate(`/books/${book.id}`)}
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
              onClick={() => deleteBook(book.id)}
              title="Delete Book"
            >
              <Trash size={14} />
            </Button>
          </div>
        )}
        loading={loading}
        hasMore={hasNextPage}
        loadMoreRef={loadMoreRef}
      />

      <BookFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        book={selectedBook}
        onSave={() => {}}
      />
    </Container>
  );
};
