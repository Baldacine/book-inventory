/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookService } from "@/services/bookService";
import { Button } from "@/shared/designSystem/Button/Button";
import {
  Container,
  BookCard,
  BookTitle,
  BookInfo,
  InfoRow,
  FooterButtons,
  LoadingMessage,
} from "./styles";
import type { Book } from "@/@types/book";

export const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    BookService.getById(Number(id))
      .then((res) => setBook(res))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (!book) return <Container>Book not found</Container>;

  return (
    <Container>
      <BookCard>
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
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button onClick={() => navigate(`/edit/${book.id}`)}>Edit</Button>
        </FooterButtons>
      </BookCard>
    </Container>
  );
};
