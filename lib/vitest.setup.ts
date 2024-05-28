import { vi } from "vitest";

declare global {
  interface Window {
    media: "dark" | "light";
  }
  var cookies: Record<string, { value: string }>; // eslint-disable-line no-var -- let is not supported in defining global due to block scope
  var path: string; // eslint-disable-line no-var -- let is not supported in defining global due to block scope
}
// mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: query.includes(window.media),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(window, "media", {
  writable: true,
  value: "dark",
});

globalThis.cookies = {};

vi.mock("next/headers", () => ({
  cookies: () => ({ get: (cookieName: string) => globalThis.cookies[cookieName] }),
}));
