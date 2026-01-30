import type { ReactElement } from "react";
import {
  render as rtlRender,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import "@testing-library/jest-dom";

import { AllProviders } from "./providers/AllProviders";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => rtlRender(ui, { wrapper: AllProviders, ...options });

export { customRender as render };

export { screen, fireEvent, waitFor };
