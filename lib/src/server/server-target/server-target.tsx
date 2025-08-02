import { cookies } from "next/headers";
import { DEFAULT_ID } from "../../constants";
import { JSX } from "react";

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
export const ServerTarget = async ({ tag, targetId, styles }: ServerTargetProps) => {
  const key = targetId || DEFAULT_ID;
  const val = (await cookies()).get(key)?.value ?? ",light";
  const [theme, cs] = val.split(",") as [string, string];
  /** to increase specificity for scoped targets. */
  const specificity = targetId ? "nth-scoped" : "";

  let classNames = [`th-${theme}`, cs, specificity];
  if (styles) classNames = classNames.map(cls => styles[cls] ?? cls);

  const Tag = tag ?? "div";
  return (
    <Tag className={classNames.join(" ")} data-nth="next" data-testid="server-target" id={key} />
  );
};
