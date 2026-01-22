import { render, screen } from "./test/test-utils";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders Hello text", () => {
    render(<App />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
