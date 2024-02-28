import useRGS from "r18gs";
import type { SetStateAction } from "r18gs";
import * as React from "react";
import type { ColorSchemePreference, ThemeState } from "../../constants";
import { DEFAULT_ID, DEFAULT_THEME_STATE } from "../../constants";

export interface ThemeSwitcherProps {
  /** id of target element to apply classes to. This is useful when you want to apply theme only to specific container. */
  targetId?: string;
  /** To stop persisting and syncing theme between tabs. */
  dontSync?: boolean;
  /** force apply CSS transition property to all the elements during theme switching. E.g., `all .3s` */
  themeTransition?: string;
  /** provide styles object imported from CSS/SCSS modules, if you are using CSS/SCSS modules. */
  styles?: Record<string, string>;
}

function useMediaQuery(setThemeState: SetStateAction<ThemeState>) {
  React.useEffect(() => {
    // set event listener for media
    const media = matchMedia("(prefers-color-scheme: dark)");
    const updateSystemColorScheme = () => {
      setThemeState(state => ({ ...state, systemColorScheme: media.matches ? "dark" : "light" }));
    };
    updateSystemColorScheme();
    media.addEventListener("change", updateSystemColorScheme);
    return () => {
      media.removeEventListener("change", updateSystemColorScheme);
    };
  }, [setThemeState]);
}

export interface LoadSyncedStateProps extends ThemeSwitcherProps {
  setThemeState: SetStateAction<ThemeState>;
}

function parseState(str?: string | null) {
  const parts = (str ?? ",system").split(",") as [string, ColorSchemePreference];
  return { theme: parts[0], colorSchemePreference: parts[1] };
}

let tInit = 0;

function useLoadSyncedState({ dontSync, targetId, setThemeState }: LoadSyncedStateProps) {
  React.useEffect(() => {
    if (dontSync) return;
    tInit = Date.now();
    const key = targetId ?? DEFAULT_ID;
    setThemeState(state => ({ ...state, ...parseState(localStorage.getItem(key)) }));
    const storageListener = (e: StorageEvent) => {
      if (e.key === key) setThemeState(state => ({ ...state, ...parseState(e.newValue) }));
    };
    window.addEventListener("storage", storageListener);
    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, [dontSync, setThemeState, targetId]);
}

function modifyTransition(themeTransition = "none", targetId?: string) {
  const css = document.createElement("style");
  /** split by ';' to prevent CSS injection */
  const transition = `transition: ${themeTransition.split(";")[0]} !important;`;
  const targetSelector = targetId ? `#${targetId},#${targetId} *,#${targetId} ~ *,#${targetId} ~ * *` : "*";
  css.appendChild(
    document.createTextNode(
      `${targetSelector}{-webkit-${transition}-moz-${transition}-o-${transition}-ms-${transition}${transition}}`,
    ),
  );
  document.head.appendChild(css);

  return () => {
    // Force restyle
    (() => window.getComputedStyle(document.body))();
    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
}

export interface ApplyClassesProps {
  targets: (HTMLElement | null)[];
  theme: string;
  resolvedColorScheme: "light" | "dark";
  styles?: Record<string, string>;
}

function applyClasses({ targets, theme, resolvedColorScheme, styles }: ApplyClassesProps) {
  let cls = ["dark", "light", theme, resolvedColorScheme];
  if (styles) cls = cls.map(c => styles[c]);

  targets.forEach(t => {
    t?.classList.remove(cls[0]); // dark
    t?.classList.remove(cls[1]); // light
    t?.classList.forEach(c => {
      if (/(?:^|_)th-/.exec(c)) t.classList.remove(c);
    });
    t?.classList.add(`th-${cls[2]}`); // theme
    t?.classList.add(cls[3]); // resolvedColorScheme
  });
}

export interface UpdateDOMProps {
  targetId?: string;
  themeState: ThemeState;
  dontSync?: boolean;
  styles?: Record<string, string>;
}

function updateDOM({ targetId, themeState, dontSync, styles }: UpdateDOMProps) {
  const { theme, colorSchemePreference: csp, systemColorScheme: scs } = themeState;
  const resolvedColorScheme = csp === "system" ? scs : csp;
  const key = targetId ?? DEFAULT_ID;
  // update DOM
  let shoulCreateCookie = false;
  const target = document.getElementById(key);
  shoulCreateCookie = !dontSync && target?.getAttribute("data-nth") === "next";

  /** do not update documentElement for local targets */
  const targets = targetId ? [target] : [target, document.documentElement];

  applyClasses({ targets, styles, resolvedColorScheme, theme });

  if (shoulCreateCookie) document.cookie = `${key}=${theme},${resolvedColorScheme}; max-age=31536000; SameSite=Strict;`;
}

/**
 * The core ThemeSwitcher component wich applies classes and transitions.
 * Cookies are set only if corresponding ServerTarget is detected.
 */
export function ThemeSwitcher({ targetId, dontSync, themeTransition, styles }: ThemeSwitcherProps) {
  if (targetId === "") throw new Error("id can not be an empty string");
  const [themeState, setThemeState] = useRGS<ThemeState>(targetId ?? DEFAULT_ID, DEFAULT_THEME_STATE);

  useMediaQuery(setThemeState);

  useLoadSyncedState({ dontSync, targetId, setThemeState });

  /** update DOM and storage */
  React.useEffect(() => {
    const restoreTransitions = modifyTransition(themeTransition, targetId);
    updateDOM({ targetId, themeState, dontSync, styles });
    if (!dontSync && tInit < Date.now() - 300) {
      // save to localStorage
      const { theme, colorSchemePreference } = themeState;
      const stateToSave = [theme, colorSchemePreference].join(",");
      const key = targetId ?? DEFAULT_ID;
      localStorage.setItem(key, stateToSave);
    }
    restoreTransitions();
  }, [dontSync, styles, targetId, themeState, themeTransition]);
  return null;
}
