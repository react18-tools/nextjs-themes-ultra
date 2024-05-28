import { HTMLProps } from "react";
import { useTheme } from "nthul/dist/hooks";

export interface ThemeButtonProps extends HTMLProps<HTMLLIElement> {
  th: string;
  targetId?: string;
  styles: Record<string, string>;
}

/**
 *
 *
 * @example
 * ```tsx
 * <ThemeButton />
 * ```
 *
 * @source - Source code
 */
export const ThemeButton = ({ targetId, th, styles, ...props }: ThemeButtonProps) => {
  const { setTheme } = useTheme(targetId);
  return (
    <li {...props}>
      <button
        className={styles[th]}
        onClick={() => {
          setTheme(th);
        }}
        type="button"
      />
    </li>
  );
};
