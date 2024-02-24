import ThemeButton from "./theme-button";
import styles from "./lib-examples.module.css";

const themes = ["", "theme1", "theme2"];

export default function ThemesList({ targetId }: { targetId?: string }) {
  return (
    <ul className={styles.themes}>
      {themes.map(th => (
        <ThemeButton key={th} {...{ targetId, th }} />
      ))}
    </ul>
  );
}
