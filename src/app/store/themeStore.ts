import { create } from "zustand";

export type ThemeMode = "light" | "dark";

type ThemeState = {
    themeMode: ThemeMode;
    toggleTheme: () => void;
};

const THEME_STORAGE_KEY = "@my-app:theme-mode";

export const useThemeStore = create<ThemeState>((set) => {
    const savedTheme = typeof window !== "undefined"
        ? (localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode) || "light"
        : "light";

    return {
        themeMode: savedTheme,
        toggleTheme: () =>
            set((state) => {
                const next = state.themeMode === "light" ? "dark" : "light";
                localStorage.setItem(THEME_STORAGE_KEY, next);
                return { themeMode: next };
            }),
    };
});
