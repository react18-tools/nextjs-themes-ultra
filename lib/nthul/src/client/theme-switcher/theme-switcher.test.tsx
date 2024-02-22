import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ThemeSwitcher } from "./theme-switcher";

describe.concurrent("theme-switcher", () => {
	afterEach(cleanup);

	test("check if h1 heading exists", ({ expect }) => {
		render(<ThemeSwitcher />);
		expect(screen.getByTestId("theme-switcher-h1").textContent).toBe("theme-switcher");
	});
});
