import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookService } from "@/services/BookService";
import { Button } from "@/shared/designSystem/Button/Button";
import { ArrowLeft } from "lucide-react";
import {
  Container,
  BackButtonWrapper,
  BookCard,
  BookTitle,
  BookInfo,
  InfoRow,
  FooterButtons,
  BookCover,
} from "./styles";
import type { Book } from "@/@types/book";
import { Loading } from "@/shared/designSystem/Loading/Loading";

export const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
    BookService.getById(id)
      .then((res) => setBook(res))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <Container>
        <Loading />
      </Container>
    );
  if (!book) return <Container>Book not found</Container>;

  return (
    <Container>
      <BackButtonWrapper>
        <Button
          variant="outline"
          size="small"
          onClick={() => navigate(-1)}
          style={{ display: "flex", alignItems: "center", gap: 4 }}
        >
          <ArrowLeft size={16} />
          Back
        </Button>
      </BackButtonWrapper>

      <BookCard>
        {book.thumbnail && <BookCover src={book.thumbnail} alt={book.title} />}
        <BookTitle>{book.title}</BookTitle>
        <BookInfo>
          <InfoRow>
            <strong>Author:</strong> <span>{book.author}</span>
          </InfoRow>
          <InfoRow>
            <strong>Publisher:</strong> <span>{book.publisher}</span>
          </InfoRow>
          <InfoRow>
            <strong>Published Date:</strong> <span>{book.publishedDate}</span>
          </InfoRow>
          <InfoRow>
            <strong>Overview:</strong> <span>{book.overview}</span>
          </InfoRow>
          <InfoRow>
            <strong>Age:</strong> <span>{book.age}</span>
          </InfoRow>
          <InfoRow>
            <strong>Email:</strong> <span>{book.email}</span>
          </InfoRow>
        </BookInfo>

        <FooterButtons>
          <Button onClick={() => navigate(`/edit/${book.id}`)}>Edit</Button>
        </FooterButtons>
      </BookCard>
    </Container>
  );
};
