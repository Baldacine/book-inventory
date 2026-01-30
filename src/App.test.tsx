import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, type To } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { HomePage } from "@/app/pages/Home";
import { BookDetailsPage } from "@/app/pages/BookDetails/BookDetailsPage";
import { AppThemeProvider } from "@/app/providers/AppThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactElement, ReactNode } from "react";
import type { Book } from "@/domain/entities/Book";

const mockBook: Book = {
  id: "1",
  title: "Test Book",
  author: "John Doe",
  publisher: "Test Publisher",
  publishedDate: "2020-01-01",
  overview: "Test overview",
  thumbnail: "",
  age: 3,
  email: "test@example.com",
};

const queryClient = new QueryClient();

const AllProviders = ({
  children,
  initialEntries = ["/"],
}: {
  children: ReactNode;
  initialEntries?: To[] | { pathname: string; state?: unknown }[];
}) => (
  <MemoryRouter initialEntries={initialEntries}>
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>{children}</AppThemeProvider>
    </QueryClientProvider>
  </MemoryRouter>
);

const renderWithProviders = (
  ui: ReactElement,
  initialEntries?: To[] | { pathname: string; state?: unknown }[],
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <AllProviders initialEntries={initialEntries}>{children}</AllProviders>
    ),
  });

describe("App routing", () => {
  it("should render header and home page on default route", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>,
      ["/"],
    );

    expect(
      screen.getByRole("heading", { name: /book inventory/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add new book/i }),
    ).toBeInTheDocument();
  });

  it("should render BookDetailsPage when navigating to /books/:id with state.book", () => {
    renderWithProviders(
      <Routes>
        <Route path="/books/:id" element={<BookDetailsPage />} />
      </Routes>,
      [{ pathname: "/books/1", state: { book: mockBook } }],
    );

    expect(screen.getByText(/test book/i)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/test publisher/i)).toBeInTheDocument();
    expect(screen.getByText(/2020-01-01/i)).toBeInTheDocument();
    expect(screen.getByText(/test overview/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /edit book/i }),
    ).toBeInTheDocument();
  });

  it("should show 'Book not found' when navigating to /books/:id without state.book", () => {
    renderWithProviders(
      <Routes>
        <Route path="/books/:id" element={<BookDetailsPage />} />
      </Routes>,
      [{ pathname: "/books/1" }],
    );

    expect(screen.getByText(/book not found/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });
});
