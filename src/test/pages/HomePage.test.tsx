import { render, screen } from "@/test/test-utils";
import { describe, it, expect, vi } from "vitest";
import { HomePage } from "@/pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppThemeProvider } from "@/app/providers/AppThemeProvider";

vi.mock("@/hooks/useBooks", () => {
  return {
    useBooks: () => ({
      books: [
        {
          id: "1",
          title: "Test Book 1",
          author: "Author 1",
          publisher: "Publisher 1",
          publishedDate: "2020-01-01",
          overview: "Overview 1",
          thumbnail: "",
          age: 3,
          email: "test1@example.com",
        },
        {
          id: "2",
          title: "Test Book 2",
          author: "Author 2",
          publisher: "Publisher 2",
          publishedDate: "2021-01-01",
          overview: "Overview 2",
          thumbnail: "",
          age: 2,
          email: "test2@example.com",
        },
      ],
      total: 2,
      loading: false,
      error: null,
      hasNextPage: false,
      fetchNextPage: vi.fn(),
      addBook: vi.fn(),
      updateBook: vi.fn(),
      deleteBook: vi.fn(),
    }),
  };
});

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>{ui}</AppThemeProvider>
    </QueryClientProvider>,
  );

describe("HomePage", () => {
  it("should render page title and Add New Book button", () => {
    renderWithProviders(<HomePage />);

    expect(
      screen.getByRole("heading", { name: /book inventory/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /add new book/i }),
    ).toBeInTheDocument();
  });

  it("should display book rows in the table", () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByText(/test book 1/i)).toBeInTheDocument();
    expect(screen.getByText(/author 1/i)).toBeInTheDocument();

    expect(screen.getByText(/test book 2/i)).toBeInTheDocument();
    expect(screen.getByText(/author 2/i)).toBeInTheDocument();
  });
});
