import { ColorSwitch, ThemeSwitcher } from "nthul";
import { ServerTarget } from "nthul/dist/server";
import styles from "./page.module.css";
import ThemesList from "./themes-list";

const targetId = "theme-switching";

export default function LocalThemes() {
  return (
    <div className={styles.example}>
      <ServerTarget targetId={targetId} />
      <ThemeSwitcher targetId={targetId} />
      <header>
        <ColorSwitch targetId={targetId} size={24} />
      </header>
      <main>
        Simple scoped multi-theme.
        <ThemesList targetId={targetId} />
      </main>
    </div>
  );
}
