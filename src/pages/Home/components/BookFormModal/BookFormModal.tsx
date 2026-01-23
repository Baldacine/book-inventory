/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import type { Book } from "@/@types/book";
import { Modal } from "@/shared/designSystem/Modal/Modal";
import { Button } from "@/shared/designSystem/Button/Button";
import { Input } from "@/shared/designSystem/Input/Input";
import { BookSchema } from "@/services/schemas/bookSchema";
import { BookService } from "@/services/BookService";
import { useToast } from "@/hooks/useToast";
import { ZodError } from "zod";
type BookFormData = Omit<Book, "id">;

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  book?: Book;
  onSave?: (book: Book) => void;
}

export const BookFormModal: React.FC<BookFormModalProps> = ({
  isOpen,
  onClose,
  book,
  onSave,
}) => {
  const initialFormData: BookFormData = book
    ? (({ id, ...rest }) => rest)(book)
    : {
        title: "",
        author: "",
        publisher: "",
        publishedDate: "",
        overview: "",
        thumbnail: "",
        age: 0,
        email: "",
      };

  const [formData, setFormData] = useState<BookFormData>(initialFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof BookFormData, string>>
  >({});
  const { showToast, Toasts } = useToast();

  useEffect(() => {
    setFormData((prev) => {
      if (book) {
        const { id, ...rest } = book;
        const isDifferent = Object.keys(rest).some(
          (key) =>
            rest[key as keyof BookFormData] !== prev[key as keyof BookFormData],
        );

        return isDifferent ? rest : prev;
      } else {
        const emptyForm = {
          title: "",
          author: "",
          category: "",
          publisher: "",
          publishedDate: "",
          overview: "",
          thumbnail: "",
          age: 0,
          email: "",
        };
        const isDifferent = Object.keys(emptyForm).some(
          (key) =>
            emptyForm[key as keyof BookFormData] !==
            prev[key as keyof BookFormData],
        );
        return isDifferent ? emptyForm : prev;
      }
    });

    setErrors({});
  }, [book]);

  const handleChange = (field: keyof BookFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async () => {
    try {
      const validated = BookSchema.parse(formData);

      const savedBook: Book = book?.id
        ? await BookService.update({ ...validated, id: book.id })
        : await BookService.create(validated);

      onSave?.(savedBook);
      onClose();
      showToast("Book saved successfully!", "success");

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

        showToast("Please fix the errors in the form.", "danger");
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
          <Button size="small" onClick={handleSubmit}>
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
          type="text"
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
          label="Age"
          required
          type="number"
          value={(formData.age ?? 0).toString()}
          onChange={(e) =>
            handleChange("age", parseInt(e.target.value, 10) || 0)
          }
          error={errors.age}
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
      <Toasts />
    </Modal>
  );
};
