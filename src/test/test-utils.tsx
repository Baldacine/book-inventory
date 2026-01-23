/* eslint-disable react-refresh/only-export-components */
import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppThemeProvider } from "@/app/providers/AppThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// cria um QueryClient fresh para cada teste
const AllProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider>{children}</AppThemeProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };

import "@testing-library/jest-dom";
