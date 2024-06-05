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

export const DEFAULT_THEME_STATE:ThemeState = {
  c: "system" as ColorSchemePreference,
  s: "light",
  t: "",
};
