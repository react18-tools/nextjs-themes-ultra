import * as React from "react";
import { useTheme } from "../../hooks/use-theme";

export interface ColorSwitchProps {
  /** id of target element if you are applying theme only to specific container. */
  targetId?: string;
  /** Diameter of the color switch */
  size?: number;
  /** Skip system colorScheme while toggling */
  skipSystem?: boolean;
}

/**
 * Color switch button to quickly set user preference
 *
 * @example
 * ```ts
 * <ColorSwitch />
 * ```
 *
 * Custom size & skipSystem
 *
 * ```ts
 * <ColorSwitch size={20} skipSystem />
 * ```
 */
export function ColorSwitch({ size = 25, skipSystem, targetId }: ColorSwitchProps) {
  const { setColorSchemePreference, resolvedColorScheme: rcs, colorSchemePreference: csp } = useTheme(targetId);
  const toggleColorScheme = () => {
    switch (csp) {
      case "system":
        setColorSchemePreference("dark");
        break;
      case "dark":
        setColorSchemePreference("light");
        break;
      case "light":
        setColorSchemePreference(skipSystem ? "dark" : "system");
    }
  };
  return (
    <button
      className={["nthul--color-switch", rcs, csp === "system" ? "system" : ""].join(" ")}
      data-testid="color-switch"
      onClick={toggleColorScheme}
      // @ts-expect-error -- setting custom attribute
      style={{ "--size": `${size}px` }}
      type="button"
    />
  );
}
