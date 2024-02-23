import { act, cleanup, fireEvent, render, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, test } from "vitest";
import { useTheme } from "../../hooks/use-theme";
import { DEFAULT_ID } from "../../constants";
import { ThemeSwitcher } from "./theme-switcher";

describe("theme-switcher", () => {
  afterEach(cleanup);

  beforeEach(() => {
    render(<ThemeSwitcher />);
  });

  test("Test changing color scheme preference", ({ expect }) => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.setColorSchemePreference("light");
    });
    expect(result.current.colorSchemePreference).toBe("light");
  });

  test("Test changing theme", ({ expect }) => {
    const { result } = renderHook(() => useTheme());
    const MY_THEME = "my-theme";
    act(() => {
      result.current.setTheme(MY_THEME);
    });
    expect(result.current.theme).toBe(MY_THEME);
  });

  test("test storing state to localStorage", async ({ expect }) => {
    const { result } = renderHook(() => useTheme());
    const MY_THEME = "my-theme-to-store";
    await new Promise(resolve => {
      setTimeout(resolve, 310);
    });
    act(() => {
      result.current.setTheme(MY_THEME);
    });
    expect(localStorage.getItem(DEFAULT_ID)).toContain(MY_THEME);
  });

  test("Storage event", async ({ expect }) => {
    const hook = renderHook(() => useTheme());
    const MY_THEME = "my-theme-update";
    await act(() =>
      fireEvent(window, new StorageEvent("storage", { key: DEFAULT_ID, newValue: `${MY_THEME},system` })),
    );
    expect(hook.result.current.theme).toBe(MY_THEME);
  });

  test.todo("test media change event -- not supported by fireEvent");
});

describe("test theme-switcher with props", () => {
  afterEach(cleanup);

  test("test dontSync", async ({ expect }) => {
    localStorage.setItem(DEFAULT_ID, "");
    render(<ThemeSwitcher dontSync />);
    const { result } = renderHook(() => useTheme());
    const MY_THEME = "my-theme-to-store";
    await new Promise(resolve => {
      setTimeout(resolve, 310);
    });
    act(() => {
      result.current.setTheme(MY_THEME);
    });
    expect(localStorage.getItem(DEFAULT_ID)).not.toContain(MY_THEME);
  });

  test.todo("test invalid targetId", ({ expect }) => {
    expect(render(<ThemeSwitcher targetId="" />)).toThrow("id can not be an empty string");
  });
});
