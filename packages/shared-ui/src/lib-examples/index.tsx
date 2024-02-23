import { Logo } from "../common/logo";
import SimpleColorSwitch from "./simple-color-switch";
import ThemeSwitching from "./theme-switching";

export default function LibExamples() {
  return (
    <div>
      <h1>
        <Logo /> examples.
      </h1>
      <SimpleColorSwitch />
      <ThemeSwitching />
    </div>
  );
}
