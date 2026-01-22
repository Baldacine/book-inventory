import { AppThemeProvider } from "./AppThemeProvider";
import { QueryProvider } from "./QueryProvider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AppThemeProvider>{children}</AppThemeProvider>
    </QueryProvider>
  );
}
