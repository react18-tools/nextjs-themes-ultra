/** shared constants -- keep in separate files for better tree-shaking and dependency injection */
export const DEFAULT_ID = "nthul";

export type ColorSchemePreference = "system" | "dark" | "light";

export interface ThemeState {
  colorSchemePreference: ColorSchemePreference;
  systemColorScheme: "dark" | "light";
  theme: string;
}

export const DEFAULT_THEME_STATE = {
  colorSchemePreference: "system" as ColorSchemePreference,
  systemColorScheme: "light" as "light" | "dark",
  theme: "",
};
