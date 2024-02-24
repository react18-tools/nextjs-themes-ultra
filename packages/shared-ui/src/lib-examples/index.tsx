import { Logo } from "../common/logo";
import SimpleColorSwitch from "./simple-color-switch";
import ThemeSwitching from "./theme-switching";
import styles from "./lib-examples.module.css";
import ThemesList from "./themes-list";

export default function LibExamples() {
  return (
    <div className={styles["lib-example-container"]}>
      <h1>
        <Logo /> examples
      </h1>
      <div className={styles.globalThemes}>
        <h2>Global Themes</h2>
        <ThemesList />
      </div>
      <SimpleColorSwitch />
      <ThemeSwitching />
    </div>
  );
}
