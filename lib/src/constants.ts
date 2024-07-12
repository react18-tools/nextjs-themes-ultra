import { useRGS } from "r18gs";

/** shared constants -- keep in separate files for better tree-shaking and dependency injection */
export const DEFAULT_ID = "nthul";

export type ColorSchemePreference = "system" | "dark" | "light";

export interface ThemeState {
  /** ColorSchemePreference */
  c: ColorSchemePreference;
  /** SystemColorScheme */
  s: "dark" | "light";
  /** Theme */
  t: string;
}

const DEFAULT_THEME_STATE: ThemeState = {
  c: "system" as ColorSchemePreference,
  s: "light",
  t: "",
};

/** To avoid multiple r18gs imports */
export const useRGSMinify = (targetId?: string) =>
  useRGS<ThemeState>(targetId ?? DEFAULT_ID, DEFAULT_THEME_STATE);
