import type { HTMLProps, ReactNode } from "react";

interface ForceThemeProps extends HTMLProps<HTMLElement> {
  /** @defaultValue 'div' */
  tag?: keyof ReactNode;
  children?: React.ReactNode;
  theme?: string;
  colorScheme?: "dark" | "light";
  /** provide styles object if you are using CSS/SCSS modules. */
  styles?: Record<string, string>;
}

/**
 * # ForceTheme
 *
 */
export const ForceTheme = ({
  children,
  tag,
  theme,
  colorScheme,
  styles,
  className,
  ...props
}: ForceThemeProps) => {
  let classNames = [theme ? `th-${theme}` : "", colorScheme ?? "", "nth-scoped"];
  if (styles) classNames = classNames.map(cls => styles[cls] ?? cls);
  if (className) classNames.push(className);
  const Tag = tag ?? "div";
  return (
    // @ts-expect-error: too complex types for props.
    <Tag {...props} className={classNames.join(" ")} data-testid="force-theme">
      {children}
    </Tag>
  );
};
