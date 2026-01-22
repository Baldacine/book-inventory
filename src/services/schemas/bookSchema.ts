import { z } from "zod";

export const BookSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    publishedDate: z.string().min(1, "Published date is required"),
    publisher: z.string().min(1, "Publisher is required"),
    overview: z.string().min(1, "Overview is required"),
    age: z
        .number()
        .int("Age must be an integer")
        .min(0, "Age cannot be negative"),
    email: z.string().email("Invalid email address"),
});
export const BookCreateSchema = BookSchema.omit({ id: true });
export const BookUpdateSchema = BookSchema.extend({ id: z.number() });
