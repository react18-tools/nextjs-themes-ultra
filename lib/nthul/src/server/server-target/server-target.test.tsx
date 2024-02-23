import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ServerTarget } from "./server-target";
import { DEFAULT_ID } from "../../constants";

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
    expect(screen.getByTestId("server-target").className).toBe(`th-${THEME} ${COLOR_SCHEME}`);
  });
});
