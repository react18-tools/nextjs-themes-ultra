"use client";

import { ColorSwitch } from "nthul";
import { useTheme } from "nthul/dist/hooks";
import styles from "./header.module.scss";
import { useCallback } from "react";

/** This is a wrapper around `nextjs-themes's ColorSwitch component to improve mobile view. */
export default function ThemeSwitch() {
  const { colorSchemePreference, setColorSchemePreference } = useTheme();
  const toggle = useCallback(() => {
    switch (colorSchemePreference) {
      case "dark":
        setColorSchemePreference("light");
        break;
      case "light":
        setColorSchemePreference("system");
        break;
      case "system":
      default:
        setColorSchemePreference("dark");
    }
  }, [colorSchemePreference]);
  return (
    <div
      className={styles.themeswitch}
      onClick={toggle}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === "Enter") toggle();
      }}
      role="button">
      <ColorSwitch size={24} />
      <span className="mb">{colorSchemePreference}</span>
    </div>
  );
}
