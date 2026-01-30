import { useRef, useState, useEffect } from "react";
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
import { useToast } from "@/hooks/useToast";
import { useBooks } from "@/hooks/useBooks";
import missingBook from "@/assets/images/missingbook.webp";
import { Loading } from "@/shared/designSystem/Loading/Loading";
import { BookFormModal } from "@/components/BookForm/BookFormModal";
import type { Book } from "@/domain/entities/Book";

export const BookDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stateBook = location.state?.book as Book | undefined;

  const { loading: booksLoading, updateBook, books } = useBooks();
  const { showToast, Toasts } = useToast();

  const [book, setBook] = useState<Book | null>(stateBook ?? null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toastShownRef = useRef(false);

  useEffect(() => {
    if (!book && !toastShownRef.current) {
      toastShownRef.current = true;
      setTimeout(() => {
        showToast("Book not found", "danger");
      }, 0);
    }
  }, [book, showToast]);

  const handleUpdate = async (updatedBook: Book) => {
    await updateBook(updatedBook);
    setBook(updatedBook);
    showToast(`Book "${updatedBook.title}" updated successfully`, "success");
  };

  if (booksLoading) return <Loading />;

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
        <p>Book not found.</p>
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
          <BookCover src={book.thumbnail || missingBook} alt={book.title} />
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
                {" | "}
                <span>
                  <strong>Published Date:</strong> {book.publishedDate}
                </span>
              </BookMeta>
              <BookMeta>
                <span>
                  <strong>Publisher:</strong> {book.publisher}
                </span>
                {" | "}
                <span>
                  <strong>Email:</strong> {book.email}
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
