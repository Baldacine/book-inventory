import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import { HomePage } from "@/pages/Home";

describe("HomePage", () => {
  it("should render the page title", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: /hello/i })).toBeInTheDocument();
  });
});
