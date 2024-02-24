import { ColorSwitch, ThemeSwitcher } from "nthul";
import { ServerTarget } from "nthul/server";
import styles from "../lib-examples.module.css";

const targetId = "simple-color-switch";
export default function SimpleColorSwitch() {
  return (
    <div className={styles.example}>
      <ServerTarget targetId={targetId} />
      <ThemeSwitcher targetId={targetId} />
      <header>
        <ColorSwitch targetId={targetId} />
      </header>
    </div>
  );
}
