import { ColorSwitch, ThemeSwitcher } from "nthul";
import { ServerTarget } from "nthul/dist/server";
import styles from "./page.module.css";

const targetId = "simple-color-switch";
export default function LocalColorSwitch() {
  return (
    <div className={styles.example}>
      <ServerTarget targetId={targetId} />
      <ThemeSwitcher targetId={targetId} />
      <header>
        <ColorSwitch targetId={targetId} size={24} />
      </header>
      <main>Simple dark/light scopped theme.</main>
    </div>
  );
}
