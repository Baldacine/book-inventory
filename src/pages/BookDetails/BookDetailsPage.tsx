import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/shared/designSystem/Button/Button";
import { ArrowLeft } from "lucide-react";
import {
  Container,
  BackButtonWrapper,
  BookCard,
  BookContent,
  BookCover,
  BookHeader,
  BookTitle,
  BookMeta,
  BookOverview,
  FooterButtons,
} from "./styles";
import type { Book } from "@/@types/book";
import { BookFormModal } from "../Home/components/BookFormModal/BookFormModal";
import { useToast } from "@/hooks/useToast";
import { useBooks } from "@/hooks/useBooks";
import { books } from "@/services/api/mocks/books";
import missingBook from "../../assets/images/missingbook.webp";
import { Loading } from "@/shared/designSystem/Loading/Loading";

export const BookDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stateBook = location.state?.book as Book | undefined;
  const { loading, updateBook } = useBooks();

  const [book, setBook] = useState<Book | null>(stateBook ?? null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast, Toasts } = useToast();

  const handleUpdate = async (updatedBook: Book) => {
    try {
      await updateBook(updatedBook);
      setBook(updatedBook);
      showToast(`Book "${updatedBook.title}" updated successfully`, "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to update book", "danger");
    }
  };

  if (loading) return <Loading />;

  if (!book)
    return (
      <Container>
        <BackButtonWrapper>
          <Button
            variant="outline"
            size="small"
            onClick={() => navigate(-1)}
            style={{ display: "flex", alignItems: "center", gap: 4 }}
          >
            <ArrowLeft size={16} /> Back
          </Button>
        </BackButtonWrapper>
        Book not found
      </Container>
    );

  return (
    <Container>
      <BackButtonWrapper>
        <Button
          variant="outline"
          size="small"
          onClick={() => navigate(-1)}
          style={{ display: "flex", alignItems: "center", gap: 4 }}
        >
          <ArrowLeft size={16} /> Back
        </Button>
      </BackButtonWrapper>

      <BookCard>
        <BookContent>
          <BookCover
            src={book.thumbnail ? book.thumbnail : missingBook}
            alt={book.title}
          />
          <div>
            <BookHeader>
              <BookTitle>{book.title}</BookTitle>
              <BookMeta>
                <span>
                  <strong>Author:</strong> {book.author}
                </span>
              </BookMeta>
              <BookMeta>
                <span>
                  <strong>Age:</strong> {book.age}
                </span>
                |
                <span>
                  <strong>Published Date:</strong> {book.publishedDate}
                </span>
              </BookMeta>
              <BookMeta>
                <span>
                  <strong>Publisher:</strong> {book.publisher}
                </span>
                |
                <span>
                  <strong>E-mail:</strong> {book.email}
                </span>
              </BookMeta>
            </BookHeader>
            <hr />
            <BookOverview>
              {book.overview || "No overview available."}
            </BookOverview>
          </div>
        </BookContent>

        <FooterButtons>
          <Button size="small" onClick={() => setIsModalOpen(true)}>
            Edit Book
          </Button>
        </FooterButtons>
      </BookCard>

      {isModalOpen && (
        <BookFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          book={book}
          books={books}
          onSave={handleUpdate}
          showToast={showToast}
        />
      )}
      <Toasts />
    </Container>
  );
};
