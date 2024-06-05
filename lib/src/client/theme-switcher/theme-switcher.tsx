import type { SetStateAction } from "r18gs";
import type { ColorSchemePreference, ThemeState } from "../../constants";
import { DEFAULT_ID,  useRGSMinify } from "../../constants";
import { useEffect } from "react";
const useEffectMinify = useEffect;
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

/** Add media query listener */
const useMediaQuery = (setThemeState: SetStateAction<ThemeState>) => {
  useEffectMinify(() => {
    // set event listener for media
    const media = matchMedia("(prefers-color-scheme: dark)");
    const updateSystemColorScheme = () => {
      setThemeState(state => ({ ...state, s: media.matches ? "dark" : "light" }));
    };
    updateSystemColorScheme();
    media.addEventListener("change", updateSystemColorScheme);
    return () => {
      media.removeEventListener("change", updateSystemColorScheme);
    };
  }, [setThemeState]);
};

const parseState = (str?: string | null) => {
  const parts = (str ?? ",system").split(",") as [string, ColorSchemePreference];
  return { theme: parts[0], colorSchemePreference: parts[1] };
};

let tInit = 0;

const useLoadSyncedState = ( setThemeState: SetStateAction<ThemeState>, dontSync?:boolean, targetId?:string  ) => {
  useEffectMinify(() => {
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
};

const modifyTransition = (themeTransition = "none", targetId?: string) => {
  const css = document.createElement("style");
  /** split by ';' to prevent CSS injection */
  const transition = `transition: ${themeTransition.split(";")[0]} !important;`;
  const targetSelector = targetId
    ? `#${targetId},#${targetId} *,#${targetId} ~ *,#${targetId} ~ * *`
    : "*";
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
};

/** Apply classes to the targets */
const applyClasses = ( targets: (HTMLElement | null)[], theme: string, resolvedColorScheme: "light" | "dark", styles?: Record<string, string>) => {
  let cls = ["dark", "light", `th-${theme}`, resolvedColorScheme];
  if (styles) cls = cls.map(c => styles[c] ?? c);

  targets.forEach(t => {
    t?.classList.remove(cls[0]); // dark
    t?.classList.remove(cls[1]); // light
    t?.classList.forEach(c => {
      if (/(?:^|_)th-/.test(c)) t.classList.remove(c);
    });
    t?.classList.add(cls[2]); // theme
    t?.classList.add(cls[3]); // resolvedColorScheme
  });
};

/** Update DOM */
const updateDOM = (themeState: ThemeState, targetId?: string, dontSync?: boolean, styles?:Record<string, string>) => {
  const { t: theme, c: csp, s: scs } = themeState;
  const resolvedColorScheme = csp === "system" ? scs : csp;
  const key = targetId ?? DEFAULT_ID;
  // update DOM
  let shoulCreateCookie = false;
  const target = document.getElementById(key);
  shoulCreateCookie = !dontSync && target?.getAttribute("data-nth") === "next";

  /** do not update documentElement for local targets */
  const targets = targetId ? [target] : [target, document.documentElement];

  applyClasses( targets,theme, resolvedColorScheme, styles);

  if (shoulCreateCookie)
    document.cookie = `${key}=${theme},${resolvedColorScheme}; max-age=31536000; SameSite=Strict;`;
};

/**
 * The core ThemeSwitcher component wich applies classes and transitions.
 * Cookies are set only if corresponding ServerTarget is detected.
 */
export const ThemeSwitcher = ({
  targetId,
  dontSync,
  themeTransition,
  styles,
}: ThemeSwitcherProps) => {
  if (targetId === "") throw new Error("id can not be an empty string");
  const [themeState, setThemeState] = useRGSMinify(targetId);

  useMediaQuery(setThemeState);

  useLoadSyncedState(setThemeState , dontSync, targetId);

  /** update DOM and storage */
  useEffectMinify(() => {
    const restoreTransitions = modifyTransition(themeTransition, targetId);
    updateDOM(themeState, targetId,  dontSync, styles);
    if (!dontSync && tInit < Date.now() - 300) {
      // save to localStorage
      const { t: theme, c: colorSchemePreference } = themeState;
      const stateToSave = [theme, colorSchemePreference].join(",");
      const key = targetId ?? DEFAULT_ID;
      localStorage.setItem(key, stateToSave);
    }
    restoreTransitions();
  }, [dontSync, styles, targetId, themeState, themeTransition]);
  return null;
};
