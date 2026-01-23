import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { AppThemeProvider } from "@/app/providers/AppThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const AllProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider>{children}</AppThemeProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};
