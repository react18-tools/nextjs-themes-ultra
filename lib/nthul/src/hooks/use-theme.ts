import useRGS from "r18gs";
import { DEFAULT_ID } from "../constants";

export type ColorSchemePreference = "system" | "dark" | "light";

export interface ThemeState {
	colorSchemePreference: ColorSchemePreference;
	systemColorScheme: "dark" | "light";
	theme: string;
}

const DEFAULT_THEME_STATE = {
	colorSchemePreference: "system" as ColorSchemePreference,
	systemColorScheme: "light" as "light" | "dark",
	theme: "",
};

export interface UseTheme {
	theme: string;
	colorSchemePreference: ColorSchemePreference;
	systemColorScheme: "dark" | "light";
	resolvedColorScheme: "dark" | "light";
	setColorSchemePreference: (colorSchemePreference: ColorSchemePreference) => void;
	setTheme: (theme: string) => void;
}

export function useTheme(id?: string): UseTheme {
	const [themeState, setState] = useRGS<ThemeState>(id ?? DEFAULT_ID, DEFAULT_THEME_STATE);
	const { colorSchemePreference: csp, systemColorScheme: scs } = themeState;
	return {
		...themeState,
		resolvedColorScheme: csp === "system" ? scs : csp,
		setColorSchemePreference: (colorSchemePreference: ColorSchemePreference) => {
			setState({ ...themeState, colorSchemePreference });
		},
		setTheme: (theme: string) => {
			setState({ ...themeState, theme });
		},
	};
}
