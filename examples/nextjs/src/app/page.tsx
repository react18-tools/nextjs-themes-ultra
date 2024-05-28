import { LandingPage } from "@repo/shared/dist/server";
import ThemesList from "./themes-list";
import styles from "./page.module.css";
import LocalColorSwitch from "./local-color-switch";
import LocalThemes from "./local-themes";
import { ColorSwitch } from "nthul";

export const metadata = {
  title: "React 18 Loaders",
};

/** next.js landing page */
export default function Page(): JSX.Element {
  return (
    <LandingPage title="Next.js Example">
      <div className={styles.globalThemes}>
        <h2>Apply Themes Globally</h2>
        <ThemesList />
        <ColorSwitch size={24} />
      </div>
      <div className={styles.localThemes}>
        <h2>Apply Themes Locally</h2>
        <LocalColorSwitch />
        <LocalThemes />
      </div>
    </LandingPage>
  );
}
