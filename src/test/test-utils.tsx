/* eslint-disable react-refresh/only-export-components */
import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppThemeProvider } from "@/app/providers/AppThemeProvider";

const AllProviders = ({ children }: { children: ReactNode }) => {
  return (
    <MemoryRouter>
      <AppThemeProvider>{children}</AppThemeProvider>
    </MemoryRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
