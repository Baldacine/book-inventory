import { type ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/theme";
import { ThemeContext } from "@/app/providers/ThemeProvider";
import { useThemeStore } from "@/app/store/themeStore";

interface Props {
  children: ReactNode;
}

export function AppThemeProvider({ children }: Props) {
  const { themeMode, toggleTheme } = useThemeStore();

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <StyledThemeProvider
        theme={themeMode === "light" ? lightTheme : darkTheme}
      >
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}
