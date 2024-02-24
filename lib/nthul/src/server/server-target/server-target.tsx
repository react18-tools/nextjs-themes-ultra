import * as React from "react";
import { cookies } from "next/headers";
import { DEFAULT_ID } from "../../constants";

interface ServerTargetProps {
  /** @defaultValue 'div' */
  tag?: keyof JSX.IntrinsicElements;
  /** id of target element if you are applying theme only to specific container.
   * make sure you pass same targetId to corresponding `ThemeSwitcher`, `ColorSwitch` and `useTheme` hook as well.
   * @defaultValue undefined*/
  targetId?: string;
  /** provide styles object if you are using CSS/SCSS modules. */
  styles?: Record<string, string>;
}

/**
 * Server Side target for avoiding flash of un-themed content.
 * @example
 * ```tsx
 * <html>
 *   ...
 *   <body>
 *     <ServerTarget />
 *     ...
 *   </body>
 * </html>
 * ```
 */
export function ServerTarget({ tag, targetId, styles }: ServerTargetProps) {
  const key = targetId || DEFAULT_ID;
  const val = cookies().get(key)?.value ?? ",light";
  let [theme, cs] = val.split(",") as [string, string];
  /** to increase specificity for scoped targets. */
  let specificity = targetId ? "nth-scoped" : "";

  if (styles) {
    theme = styles[theme];
    cs = styles[cs];
    specificity = styles[specificity] ?? "";
  }

  const cls = `th-${theme} ${cs} ${specificity}`;

  const Tag = tag ?? "div";
  return <Tag className={cls} data-nth="next" data-testid="server-target" id={key} />;
}
