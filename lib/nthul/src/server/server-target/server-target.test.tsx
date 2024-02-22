import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ServerTarget } from "./server-target";

describe.concurrent("server-target", () => {
	afterEach(cleanup);

	test("check if h1 heading exists", ({ expect }) => {
		render(<ServerTarget />);
		expect(screen.getByTestId("server-target-h1").textContent).toBe("server-target");
	});
});
