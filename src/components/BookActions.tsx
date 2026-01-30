import React from "react";
import { Button } from "@/shared/designSystem/Button/Button";
import { Eye, Edit2, Trash } from "lucide-react";
import type { Book } from "@/domain/entities/Book";

interface BookActionsProps {
  book: Book;
  onView?: (book: Book) => void;
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
}

export const BookActions: React.FC<BookActionsProps> = ({
  book,
  onView,
  onEdit,
  onDelete,
}) => (
  <div style={{ display: "flex", gap: 8 }}>
    {onView && (
      <Button
        size="small"
        variant="circle"
        onClick={() => onView(book)}
        title="View Book"
      >
        <Eye size={14} />
      </Button>
    )}
    {onEdit && (
      <Button
        size="small"
        variant="circle"
        onClick={() => onEdit(book)}
        title="Edit Book"
      >
        <Edit2 size={14} />
      </Button>
    )}
    {onDelete && (
      <Button
        size="small"
        variant="circle"
        color="red"
        onClick={() => onDelete(book)}
        title="Delete Book"
      >
        <Trash size={14} />
      </Button>
    )}
  </div>
);
