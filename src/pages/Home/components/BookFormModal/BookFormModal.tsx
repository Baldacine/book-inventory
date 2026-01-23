/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import type { Book } from "@/@types/book";
import { Modal } from "@/shared/designSystem/Modal/Modal";
import { Button } from "@/shared/designSystem/Button/Button";
import { Input } from "@/shared/designSystem/Input/Input";
import { BookSchema } from "@/services/schemas/bookSchema";
import { BookService } from "@/services/BookService";
import { ZodError } from "zod";
import { calculateBookAge } from "@/utils/helpers";
type BookFormData = Omit<Book, "id">;

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  book?: Book;
  books: Book[];
  onSave?: (book: Book) => void;
  showToast: (
    message: string,
    type?: "success" | "danger" | "warning",
    duration?: number,
  ) => void;
}

export const BookFormModal: React.FC<BookFormModalProps> = ({
  isOpen,
  onClose,
  book,
  books,
  onSave,
  showToast,
}) => {
  const emptyForm: BookFormData = {
    title: "",
    author: "",
    publisher: "",
    publishedDate: "",
    overview: "",
    thumbnail: "",
    age: 0,
    email: "",
  };

  const [formData, setFormData] = useState<BookFormData>(emptyForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof BookFormData, string>>
  >({});

  useEffect(() => {
    if (!isOpen) return;
    setFormData(book ? (({ id, ...rest }) => rest)(book) : emptyForm);
    setErrors({});
  }, [book, isOpen]);

  const handleChange = (field: keyof BookFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async () => {
    try {
      const validated = BookSchema.parse(formData);

      const duplicate = books.find(
        (b) =>
          b.title.toLowerCase() === validated.title.toLowerCase() &&
          b.id !== book?.id,
      );

      if (duplicate) {
        showToast(
          `A book with the title "${validated.title}" already exists!`,
          "warning",
        );
        return;
      }

      const savedBook: Book = book?.id
        ? await BookService.update({ ...validated, id: book.id })
        : await BookService.create(validated);
      onSave?.(savedBook);
      onClose();

      !book?.id && showToast("Book saved successfully!", "success");

      setErrors({});
    } catch (err) {
      if (err instanceof ZodError) {
        const zodErr = err as ZodError<BookFormData>;

        const fieldErrors: Partial<Record<keyof BookFormData, string>> = {};
        zodErr.issues.forEach((issue) => {
          if (issue.path && issue.path[0]) {
            const field = issue.path[0] as keyof BookFormData;
            fieldErrors[field] = issue.message;
          }
        });
        setErrors(fieldErrors);
      } else if (err instanceof Error) {
        showToast(err.message || "An unexpected error occurred.", "danger");
      } else {
        showToast("An unexpected error occurred.", "danger");
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={book ? "Edit Book" : "Add New Book"}
      width="90vw"
      maxWidth={600}
      height="90vh"
      footer={
        <div
          style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}
        >
          <Button variant="outline" size="small" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="small"
            onClick={() => {
              handleSubmit();
            }}
            type="button"
          >
            {book ? "Update" : "Create"}
          </Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Input
          label="Title"
          required
          type="text"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          error={errors.title}
        />
        <Input
          label="Author"
          required
          type="text"
          value={formData.author}
          onChange={(e) => handleChange("author", e.target.value)}
          error={errors.author}
        />
        <Input
          label="Publisher"
          required
          type="text"
          value={formData.publisher}
          onChange={(e) => handleChange("publisher", e.target.value)}
          error={errors.publisher}
        />
        <Input
          label="Published Date"
          required
          type="date"
          value={formData.publishedDate}
          onChange={(e) => handleChange("publishedDate", e.target.value)}
          error={errors.publishedDate}
        />
        <Input
          label="Overview"
          required
          type="text"
          value={formData.overview}
          onChange={(e) => handleChange("overview", e.target.value)}
          error={errors.overview}
          textarea
        />
        <Input
          label={`Age (Calculated automatically from Published Date)`}
          required
          type="number"
          value={calculateBookAge(formData.publishedDate).toString()}
          error={errors.age}
          disabled
          onChange={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <Input
          label="Email"
          required
          type="email"
          value={formData.email ?? ""}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
        />
      </div>
    </Modal>
  );
};
