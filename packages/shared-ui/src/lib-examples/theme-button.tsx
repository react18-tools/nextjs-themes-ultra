"use client";

import { useTheme } from "nthul/src/hooks";
import styles from "./lib-examples.module.css";

export default function ThemeButton({ th, targetId }: { th: string; targetId?: string }) {
  const { setTheme } = useTheme(targetId);
  return (
    <li>
      <button
        className={styles[th]}
        onClick={() => {
          setTheme(th);
        }}
        type="button"
      />
    </li>
  );
}
