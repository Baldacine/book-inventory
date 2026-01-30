import React, { useState } from "react";
import { Modal } from "@/shared/designSystem/Modal/Modal";
import { Button } from "@/shared/designSystem/Button/Button";
import { BookForm, type BookFormData } from "./BookForm";
import { BookSchema } from "@/domain/schemas/bookSchema";
import { ZodError } from "zod";
import type { Book } from "@/domain/entities/Book";

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  book?: Book;
  books: Book[];
  onSave?: (book: Book) => void;
  showToast: (
    msg: string,
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

  const [formData, setFormData] = useState<BookFormData>(
    () => book ?? emptyForm,
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof BookFormData, string>>
  >({});

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

      const bookToSave: Book = {
        ...validated,
        id: book?.id ?? `local_${Date.now()}`,
      };

      await onSave?.(bookToSave);
      onClose();

      showToast(
        book
          ? `Book "${validated.title}" updated successfully!`
          : "Book created successfully!",
        "success",
      );
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Partial<Record<keyof BookFormData, string>> = {};
        err.issues.forEach((issue) => {
          if (issue.path && issue.path[0]) {
            fieldErrors[issue.path[0] as keyof BookFormData] = issue.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        showToast(
          (err as Error).message || "An unexpected error occurred.",
          "danger",
        );
      }
    }
  };

  return (
    <Modal
      key={book?.id ?? "new"}
      isOpen={isOpen}
      onClose={onClose}
      title={book ? "Edit Book" : "Add New Book"}
      width="90vw"
      maxWidth={600}
      height="90vh"
      footer={
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <Button variant="outline" size="small" onClick={onClose}>
            Cancel
          </Button>
          <Button size="small" onClick={handleSubmit}>
            {book ? "Update" : "Create"}
          </Button>
        </div>
      }
    >
      <BookForm formData={formData} errors={errors} onChange={handleChange} />
    </Modal>
  );
};
