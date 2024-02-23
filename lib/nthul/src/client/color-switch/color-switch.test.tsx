import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ColorSwitch } from "./color-switch";

describe.concurrent("color-switch", () => {
  afterEach(cleanup);

  test("check if h1 heading exists", ({ expect }) => {
    render(<ColorSwitch />);
    expect(screen.getByTestId("color-switch-h1").textContent).toBe("color-switch");
  });
});
