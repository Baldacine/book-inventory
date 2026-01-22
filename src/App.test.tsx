import { render, screen } from "@/test/test-utils";
import { describe, it, expect } from "vitest";
import App from "@/App";

describe("App", () => {
  it("should render header and home page", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /hello/i })).toBeInTheDocument();
  });
});
