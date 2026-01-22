import { createContext, useContext } from "react";

export type ThemeMode = "light" | "dark";

export interface ThemeContextData {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextData | undefined>(
  undefined
);

export const useAppTheme = (): ThemeContextData => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within an AppThemeProvider");
  }
  return context;
};
