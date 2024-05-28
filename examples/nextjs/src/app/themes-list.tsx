import { ThemeButton } from "@repo/shared/dist/client/theme-button";
import styles from "./page.module.css";

const themes = ["", "theme1", "theme2"];

export default function ThemesList({ targetId }: { targetId?: string }) {
  return (
    <ul className={styles.themes}>
      {themes.map(th => (
        <ThemeButton key={th} {...{ targetId, th, styles }} />
      ))}
    </ul>
  );
}
