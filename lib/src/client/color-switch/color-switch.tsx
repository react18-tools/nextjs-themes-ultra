import { HTMLProps } from "react";
import { useTheme } from "../../hooks";

interface ColorSwitchProps extends HTMLProps<HTMLDivElement> {
  /** id of target element if you are applying theme only to specific container. Should be same as corresponding ThemeSwitcher, etc. */
  targetId?: string;
  /** Diameter of the color switch */
  size?: number;
  /** Skip system colorScheme while toggling */
  skipSystem?: boolean;
}

/**
 * Color switch button to quickly set user preference.
 * Use same targetId for corresponding components and hooks if you are using themes for specific container only.
 *
 * @example
 * ```tsx
 * <ColorSwitch />
 * ```
 *
 * Custom size & skipSystem
 *
 * ```ts
 * <ColorSwitch size={20} skipSystem />
 * ```
 *
 * @source - Source code
 */
export const ColorSwitch = ({ targetId, skipSystem, size, ...props }: ColorSwitchProps) => {
  const {
    setColorSchemePreference,
    resolvedColorScheme: rcs,
    colorSchemePreference: csp,
  } = useTheme(targetId);
  const toggleColorScheme = () => {
    switch (csp) {
      case "dark":
        setColorSchemePreference("light");
        break;
      case "light":
        setColorSchemePreference(skipSystem ? "dark" : "system");
        break;
      case "system":
      default:
        setColorSchemePreference("dark");
        break;
    }
  };
  return (
    <button
      className={["nthul--color-switch", rcs, csp === "system" ? "system" : ""].join(" ")}
      data-testid="color-switch"
      {...props}
      onClick={toggleColorScheme}
      // @ts-expect-error -- setting custom attribute
      style={{ "--size": `${size}px` }}
      type="button"
    />
  );
};
