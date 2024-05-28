import { HTMLProps, ReactNode } from "react";
import styles from "./color-switch.module.scss";

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
export function ColorSwitch({ children, ...props }: ColorSwitchProps) {
  const className = [props.className, styles["color-switch"]].filter(Boolean).join(" ");
  return (
    <div {...props} className={className} data-testid="color-switch">
      {children}
    </div>
  );
}
