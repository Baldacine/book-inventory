import React, { useMemo } from "react";
import { calculateBookAge } from "@/utils/helpers";
import { Input } from "@/shared/designSystem/Input/Input";
import type { Book } from "@/domain/entities/Book";

export type BookFormData = Omit<Book, "id">;

interface BookFormProps {
  formData: BookFormData;
  errors: Partial<Record<keyof BookFormData, string>>;
  onChange: (field: keyof BookFormData, value: string | number) => void;
}

export const BookForm: React.FC<BookFormProps> = ({
  formData,
  errors,
  onChange,
}) => {
  const age = useMemo(
    () => calculateBookAge(formData.publishedDate),
    [formData.publishedDate],
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Input
        label="Title"
        value={formData.title}
        onChange={(e) => onChange("title", e.target.value)}
        error={errors.title}
        type={""}
      />
      <Input
        label="Author"
        value={formData.author}
        onChange={(e) => onChange("author", e.target.value)}
        error={errors.author}
        type={""}
      />
      <Input
        label="Publisher"
        value={formData.publisher}
        onChange={(e) => onChange("publisher", e.target.value)}
        error={errors.publisher}
        type={""}
      />
      <Input
        label="Published Date"
        type="date"
        value={formData.publishedDate}
        onChange={(e) => onChange("publishedDate", e.target.value)}
        error={errors.publishedDate}
      />
      <Input
        label="Overview"
        textarea
        value={formData.overview}
        onChange={(e) => onChange("overview", e.target.value)}
        error={errors.overview}
        type={""}
      />
      <Input
        label="Age (calculated)"
        type="number"
        value={age.toString()}
        disabled
        error={errors.age}
      />
      <Input
        label="Email"
        type="email"
        value={formData.email ?? ""}
        onChange={(e) => onChange("email", e.target.value)}
        error={errors.email}
      />
    </div>
  );
};
