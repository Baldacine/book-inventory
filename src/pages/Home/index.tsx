import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Book } from "@/@types/book";
import type { Column } from "@/@types/table";

import { useBooks } from "@/hooks/useBooks";
import { Table } from "@/shared/designSystem/Table/Table";
import { Button } from "@/shared/designSystem/Button/Button";
import {
  Container,
  AreaTitleButton,
  LoadingMessage,
  ErrorMessage,
} from "./styles";
import { BookFormModal } from "./components/BookFormModal/BookFormModal";
import { Edit2, Trash } from "lucide-react";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const { books, total, loading, error, page, limit, fetchBooks, deleteBook } =
    useBooks();

  const [selectedBook, setSelectedBook] = useState<Book | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBooks(page, limit);
  }, [fetchBooks, page, limit]);

  const columns: Column<Book>[] = [
    {
      header: "Title",
      accessor: (book) => (
        <span
          style={{
            cursor: "pointer",
            textDecoration: "underline",
            color: "#007bff",
          }}
          onClick={() => navigate(`/books/${book.id}`)}
        >
          {book.title}
        </span>
      ),
    },
    { header: "Author", accessor: "author" },
    { header: "Publisher", accessor: "publisher" },
    { header: "Published Date", accessor: "publishedDate" },
    { header: "Age", accessor: "age" },
  ];

  const handleSave = () => fetchBooks(page, limit);

  // Função para trocar de página
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(total / limit)) {
      fetchBooks(newPage, limit);
    }
  };

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

      {loading && <LoadingMessage>Loading books...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {!loading && !error && (
        <Table
          columns={columns}
          data={books}
          actions={(book) => (
            <>
              <Button
                size="small"
                variant="circle"
                onClick={() => {
                  setSelectedBook(book);
                  setIsModalOpen(true);
                }}
                style={{ marginLeft: 10 }}
              >
                <Edit2 size={15} />
              </Button>
              <Button
                size="small"
                variant="circle"
                color="red"
                onClick={() => deleteBook(book.id)}
                style={{ marginLeft: 10, color: "red" }}
              >
                <Trash size={15} style={{ color: "red" }} />
              </Button>
            </>
          )}
          page={page}
          limit={limit}
          total={total}
          onPageChange={handlePageChange}
        />
      )}

      <BookFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        book={selectedBook}
        onSave={handleSave}
      />
    </Container>
  );
};
