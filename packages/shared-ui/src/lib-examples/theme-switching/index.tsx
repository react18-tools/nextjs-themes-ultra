import { ColorSwitch, ThemeSwitcher } from "nthul";
import { ServerTarget } from "nthul/server";
import styles from "../lib-examples.module.css";

const targetId = "theme-switching";
const themes = ["theme1", "theme2"];
export default function SimpleColorSwitch() {
  return (
    <div className={styles.example}>
      <ServerTarget targetId={targetId} />
      <ThemeSwitcher targetId={targetId} />
      <header>
        <ColorSwitch targetId={targetId} />
      </header>
      <main>
        <select name="" id="">
          {themes.map(th => (
            <option value={th} key={th}>
              {th}
            </option>
          ))}
        </select>
      </main>
    </div>
  );
}
