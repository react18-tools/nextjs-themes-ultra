import useRGS from "r18gs";
import type { ColorSchemePreference, ThemeState } from "../constants";
import { DEFAULT_ID, DEFAULT_THEME_STATE } from "../constants";

export interface UseTheme {
  theme: string;
  colorSchemePreference: ColorSchemePreference;
  systemColorScheme: "dark" | "light";
  resolvedColorScheme: "dark" | "light";
  setColorSchemePreference: (colorSchemePreference: ColorSchemePreference) => void;
  setTheme: (theme: string) => void;
}

/**
 * use this hook to gain access to theme state and setters from your components.
 * @param targetId - targetId corresponding to `ThemeSwitcher` and others tied to specific container.
 * @returns themeState and setter fucntions
 */
export const useTheme = (targetId?: string): UseTheme => {
  const [themeState, setState] = useRGS<ThemeState>(targetId ?? DEFAULT_ID, DEFAULT_THEME_STATE);
  const { c: csp, s: scs, t } = themeState;
  return {
    theme: t,
    colorSchemePreference: csp,
    systemColorScheme: scs,
    resolvedColorScheme: csp === "system" ? scs : csp,
    setColorSchemePreference: (colorSchemePreference: ColorSchemePreference) => {
      setState({ ...themeState, c: colorSchemePreference });
    },
    setTheme: (theme: string) => {
      setState({ ...themeState, t: theme });
    },
  };
};
