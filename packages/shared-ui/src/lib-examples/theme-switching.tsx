import { ColorSwitch, ThemeSwitcher } from "nthul";
import { ServerTarget } from "nthul/server";
import styles from "./lib-examples.module.css";
import ThemesList from "./themes-list";

const targetId = "theme-switching";

export default function SimpleColorSwitch() {
  return (
    <div className={styles.example}>
      <ServerTarget targetId={targetId} />
      <ThemeSwitcher targetId={targetId} />
      <header>
        <ColorSwitch targetId={targetId} />
      </header>
      <main>
        Simple scoped multi-theme.
        <ThemesList targetId={targetId} />
      </main>
    </div>
  );
}
