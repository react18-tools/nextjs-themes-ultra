import { ColorSwitch, ThemeSwitcher } from "nthul";
import { ServerTarget } from "nthul/server";
import styles from "../lib-examples.module.css";
import ThemeButton from "./theme-button";

export const targetId = "theme-switching";
const themes = ["", "theme1", "theme2"];

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
        <ul className={styles.themes}>
          {themes.map(th => (
            <ThemeButton key={th} {...{ targetId, th }} />
          ))}
        </ul>
      </main>
    </div>
  );
}
