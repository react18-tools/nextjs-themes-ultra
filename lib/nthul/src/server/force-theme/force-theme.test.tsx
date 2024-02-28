import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ForceTheme } from "./force-theme";

describe("force-theme", () => {
  afterEach(cleanup);

  test("check specificity class exists", ({ expect }) => {
    render(<ForceTheme />);
    expect(screen.getByTestId("force-theme").classList).toContain("nth-scoped");
  });

  test("force theme", ({ expect }) => {
    render(<ForceTheme theme="my-theme" />);
    expect(screen.getByTestId("force-theme").classList).toContain("th-my-theme");
  });
});
