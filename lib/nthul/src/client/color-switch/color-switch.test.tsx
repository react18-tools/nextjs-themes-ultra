import { act, cleanup, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { useTheme } from "../../hooks/use-theme";
import { ColorSwitch } from "./color-switch";

describe("color-switch", () => {
  afterEach(cleanup);

  test("color-scheme-toggle", async ({ expect }) => {
    const hook = renderHook(() => useTheme());
    render(<ColorSwitch />);
    const element = screen.getByTestId("color-switch");
    await act(() => fireEvent.click(element));
    expect(hook.result.current.colorSchemePreference).toBe("dark");
    await act(() => fireEvent.click(element));
    expect(hook.result.current.colorSchemePreference).toBe("light");
    await act(() => fireEvent.click(element));
    expect(hook.result.current.colorSchemePreference).toBe("system");
    await act(() => fireEvent.click(element));
    expect(hook.result.current.colorSchemePreference).toBe("dark");
  });

  test("color-scheme-toggle with skip system", async ({ expect }) => {
    const hook = renderHook(() => useTheme());
    act(() => {
      hook.result.current.setColorSchemePreference("system");
    });
    render(<ColorSwitch skipSystem />);
    const element = screen.getByTestId("color-switch");
    await act(() => fireEvent.click(element));
    expect(hook.result.current.colorSchemePreference).toBe("dark");
    await act(() => fireEvent.click(element));
    expect(hook.result.current.colorSchemePreference).toBe("light");
    await act(() => fireEvent.click(element));
    expect(hook.result.current.colorSchemePreference).toBe("dark");
  });
});
