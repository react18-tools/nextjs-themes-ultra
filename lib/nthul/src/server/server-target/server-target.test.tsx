import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { DEFAULT_ID } from "../../constants";
import { ServerTarget } from "./server-target";

describe("server-target", () => {
  afterEach(cleanup);

  test("test default tag", ({ expect }) => {
    render(<ServerTarget />);
    expect(screen.getByTestId("server-target").tagName).toBe("DIV");
  });

  test("test custom tag", ({ expect }) => {
    render(<ServerTarget tag="h1" />);
    expect(screen.getByTestId("server-target").tagName).toBe("H1");
  });

  test("test classes from cookies", ({ expect }) => {
    const THEME = "my-theme";
    const COLOR_SCHEME = "dark";
    globalThis.cookies = {
      [DEFAULT_ID]: {
        value: `${THEME},${COLOR_SCHEME}`,
      },
    };
    render(<ServerTarget />);
    expect(screen.getByTestId("server-target").className).toBe(`th-${THEME} ${COLOR_SCHEME} `);
  });

  test("test classes from styles", ({ expect }) => {
    const THEME = "my-theme";
    const COLOR_SCHEME = "dark";
    globalThis.cookies = {
      [DEFAULT_ID]: {
        value: `${THEME},${COLOR_SCHEME}`,
      },
    };
    const styles = {
      [`th-${THEME}`]: `moduled-${THEME}`,
      dark: `moduled-dark`,
      light: `moduled-light`,
    };
    render(<ServerTarget styles={styles} />);
    expect(screen.getByTestId("server-target").className).toBe(`${styles[`th-${THEME}`]} ${styles[COLOR_SCHEME]} `);
  });
});
