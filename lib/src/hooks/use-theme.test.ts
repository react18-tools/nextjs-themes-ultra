import { cleanup, renderHook, act } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { useTheme } from "./use-theme";

describe.concurrent("useTheme", () => {
  afterEach(cleanup);

  test("Test colorSchemePreference", ({ expect }) => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setColorSchemePreference("light"));
    expect(result.current.colorSchemePreference).toBe("light");
  });

  test("Test theme", ({ expect }) => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setTheme("my-theme"));
    expect(result.current.theme).toBe("my-theme");
  });
});
