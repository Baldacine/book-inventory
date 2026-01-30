import { AppThemeProvider } from "@/app/providers/AppThemeProvider";
import { QueryProvider } from "@/app/providers/QueryProvider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AppThemeProvider>{children}</AppThemeProvider>
    </QueryProvider>
  );
}
