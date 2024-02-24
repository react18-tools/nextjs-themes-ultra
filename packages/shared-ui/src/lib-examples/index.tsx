import { Logo } from "../common/logo";
import SimpleColorSwitch from "./simple-color-switch";
import ThemeSwitching from "./theme-switching";
import styles from "./lib-examples.module.css";

export default function LibExamples() {
  return (
    <div className={styles["lib-example-container"]}>
      <h1>
        <Logo /> examples.
      </h1>
      <SimpleColorSwitch />
      <ThemeSwitching />
    </div>
  );
}
