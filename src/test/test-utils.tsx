/* eslint-disable react-refresh/only-export-components */
import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { AppThemeProvider } from "@/app/providers/AppThemeProvider";

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return <AppThemeProvider>{children}</AppThemeProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
