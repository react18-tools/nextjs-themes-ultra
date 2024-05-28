# Nextjs-Themes-Ultra <img src="https://github.com/react18-tools/nextjs-themes-ultra/blob/main/popper.png?raw=true" style="height: 40px"/>

[![test](https://github.com/react18-tools/nextjs-themes-ultra/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/nextjs-themes-ultra/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/85f6447e649201924a2c/maintainability)](https://codeclimate.com/github/react18-tools/nextjs-themes-ultra/maintainability) [![codecov](https://codecov.io/gh/react18-tools/nextjs-themes-ultra/graph/badge.svg)](https://codecov.io/gh/react18-tools/nextjs-themes-ultra) [![Version](https://img.shields.io/npm/v/nthul.svg?colorB=green)](https://www.npmjs.com/package/nthul) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/nthul.svg)](https://www.npmjs.com/package/nthul) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/nthul) [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

Nextjs-Themes-Ultra is a comprehensive library designed to unlock the full potential of React 18 server components.
🤟 👉 [Unleash the Power of React Server Components](https://medium.com/javascript-in-plain-english/unleash-the-power-of-react-server-components-eb3fe7201231)

> A canonical package with a longer and more descriptive name is also published as `nextjs-themes-ultra`

## Motivation

I created the `nextjs-themes` library to achieve functionality similar to `next-themes` with React Server Components. While it worked well, I encountered issues with tree-shaking and noticed some rarely used functions could be removed or replaced to improve performance and readability.

I had plans to update the main library [`nextjs-themes`](https://github.com/react18-tools/nextjs-themes), but it required ensuring minimal changes to the existing APIs. Therefore, I created a new library that has the potential to be a better alternative in most cases.

## Features

✅ Perfect dark mode with just 2 lines of code

✅ Works with Tailwind CSS

✅ Fully tree-shakable (`import from nthul/client/theme-switcher`)

✅ Designed for excellence

✅ Full TypeScript support

✅ Unleash the full power of React 18 Server components

✅ System setting with `prefers-color-scheme`

✅ Themed browser UI with `color-scheme`

✅ Support for Next.js 13 & 14 `appDir`

✅ No flash on load (supports SSG, SSR, ISG, and Server Components)

✅ Sync theme across tabs and windows (can opt-out by passing `dontSync` to `ThemeSwitcher`)

✅ Apply custom transitions when changing themes

✅ Force pages to specific themes (requires assigning `className`, detailed techniques coming soon)

✅ Manipulate theme via the `useTheme` hook

✅ Documented with [Typedoc](https://react18-tools.github.io/nextjs-themes-ultra) ([Docs](https://react18-tools.github.io/nextjs-themes-ultra))

✅ Use combinations of `th-` and `dark` or `light` classes for dark/light variants of themes

✅ Avoids storing cookies when not using the corresponding `ServerTarget`

✅ Compatible with all build systems/tools/frameworks for React 18

> Feel free to [request](https://github.com/react18-tools/nextjs-themes-ultra/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=) or [discuss](https://github.com/react18-tools/nextjs-themes-ultra/discussions) new features, or [report bugs](https://github.com/react18-tools/nextjs-themes-ultra/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=).

> <img src="https://github.com/react18-tools/nextjs-themes-ultra/blob/main/popper.png?raw=true" style="height: 20px"/> Please consider starring [this repository](https://github.com/react18-tools/nextjs-themes-ultra) and sharing it with your friends.

## Install

> A canonical package with a longer and more descriptive name is also published as `nextjs-themes-ultra`

```bash
$ pnpm add nthul
```

**_or_**

```bash
$ npm install nthul
```

**_or_**

```bash
$ yarn add nthul
```

## Want a Lite Version? [![npm bundle size](https://img.shields.io/bundlephobia/minzip/nthul-lite)](https://www.npmjs.com/package/nthul-lite) [![Version](https://img.shields.io/npm/v/nthul-lite.svg?colorB=green)](https://www.npmjs.com/package/nthul-lite) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/nthul-lite.svg)](https://www.npmjs.com/package/nthul-lite)

```bash
$ pnpm add nthul-lite
```

**_or_**

```bash
$ npm install nthul-lite
```

**_or_**

```bash
$ yarn add nthul-lite
```

> You need `r18gs` as a peer-dependency

## Usage

> Please explore `examples` and `packages/shared-ui` for working examples. (updates coming soon...)

### SPA (e.g., Vite, CRA) and Next.js pages directory (No server components)

To add dark mode support, modify `_app` as follows:

```js
import { ThemeSwitcher, ColorSwitch } from "nthul/client"; // for better tree-shaking

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeSwitcher />
      <header>
        <ColorSwitch />
      </header>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
```

⚡🎉Boom! Just a couple of lines and your dark mode is ready, complete with a color switch for user preferences. Check out examples for advanced usage.

> For `vite` or any other build tool, find a similar root component, e.g., `<App />` in `CRA` and `vite`.

### With Next.js `app` router (Server Components)

If your app serves mostly static content, you can avoid SSR overhead. When using this approach, use CSS general sibling combinator (~) to ensure your themed CSS is applied properly. See (HTML & CSS)[#html--css].

Update your `app/layout.jsx` to add `ThemeSwitcher` and `ServerTarget`. `ServerTarget` avoids a flash of un-themed content on reload.

```tsx
// app/layout.jsx
import { ThemeSwitcher } from "nthul/client/theme-switcher"; // for better tree-shaking
import { ServerTarget } from "nthul/server/nextjs";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        /** use ServerTarget as first element inside body */
        <ServerTarget />
        <ThemeSwitcher />
        {children}
      </body>
    </html>
  );
}
```

You just added multiple theme and color-scheme modes and can use Server Component! Isn't that awesome?

### ColorSwitch

An elegant color switch to toggle color schemes ("dark" | "light" | "system").

```tsx
<ColorSwitch />
```

### HTML & CSS

Your Next.js app fully supports dark mode, including system preference with `prefers-color-scheme`. The theme is also synced between tabs. By default, `nthul` modifies the `className` on the `html` element, which you can use to style your app:

```css
:root {
  --background: white;
  --foreground: black;
}

.dark {
  --background: black;
  --foreground: white;
}

/* for custom themes */

.th-theme1 {
  --background: red;
  --foreground: yellow;
}

/* for custom theme with dark and light variants */

.dark.th-theme2 {
  --background: blue;
  --foreground: white;
}

.light.th-theme2 {
  --background: white;
  --foreground: blue;
}

/* for scoped containers add .nth-scoped call as well - required only when using containerized themes. */
.nth-scoped.th-.dark {
  ...
}

.nth-scoped.th-theme.dark {
  ...
}
```

See the [Example CSS file](https://github.com/react18-tools/nextjs-themes-ultra/blob/main/packages/shared-ui/src/globals.css).

#### When using `ServerTarget`

When using `ServerTarget`, use the CSS general sibling combinator (~) since `ServerTarget` does not wrap your app.

Replace `.selector` with a combination of selectors from the description above.

```css
.selector,
.selector *,
.selector ~ *,
.selector ~ * * {
  --th-variable: value;
}
```

We encourage using this pattern to define your theme variables in CSS to avoid unwanted overrides.

## Images

You can also show different images based on the current theme.

```jsx
import Image from "next/image";
import { useTheme } from "nthul/hooks";

function ThemedImage() {
  const { resolvedColorScheme } = useTheme();
  let src;

  switch (resolvedColorScheme) {
    case "light":
      src = "/light-mode-image.png";
      break;
    case "dark":
      src = "/dark-mode-image.png";
      break;
    default:
      src = "/default-image.png";
      break;
  }

  return <Image src={src} alt="Themed Image" />;
}
```

### useTheme

In case your components need to know the current theme and be able to change it. The `useTheme` hook provides theme information:

```js
import { useTheme } from "nthul";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      The current theme is: {theme}
      <button onClick={() => setTheme("light")}>Light Mode</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
    </div>
  );
};
```

`useTheme` hook will return following object.

```ts
interface UseTheme {
  theme: string;
  colorSchemePreference: "dark" | "light" | "system";
  systemColorScheme: "dark" | "light";
  resolvedColorScheme: "dark" | "light";
  setColorSchemePreference: (colorSchemePreference: ColorSchemePreference) => void;
  setTheme: (theme: string) => void;
}
```

## Force per page theme and color-scheme

We have not added any components or hooks for forcing `theme` and `color-scheme` per page or per element basis. As this is a rarely used scenario. However, you can acheive this by applying appropreate calssNames.

```tsx
// force a theme for the page
export default function Page() {
  return <div className="dark nth-scoped th-theme1">...</div>;
}
```

> We are open to listening your feedback - [Discussions](https://github.com/react18-tools/nextjs-themes-ultra/discussions)

### With Styled Components and any CSS-in-JS

Next Themes is completely CSS independent, it will work with any library. For example, with Styled Components you just need to `createGlobalStyle` in your custom App:

```js
// pages/_app.js
import { createGlobalStyle } from "styled-components";
import { ThemeSwitcher } from "nthul";

// Your themeing variables
const GlobalStyle = createGlobalStyle`
  :root {
    --fg: #000;
    --bg: #fff;
  }

  [data-theme="dark"] {
    --fg: #fff;
    --bg: #000;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeSwitcher />
      <Component {...pageProps} />
    </>
  );
}
```

### With Tailwind

In your `tailwind.config.js`, set the dark mode property to class:

```js
// tailwind.config.js
module.exports = {
  darkMode: "class",
};
```

⚡🎉Boom! You are ready to use darkTheme in tailwind.

> Caution! Your class must be set to `"dark"`, which is the default value we have used for this library. Tailwind, as of now, requires that class name must be `"dark"` for dark-theme.

That's it! Now you can use dark-mode specific classes:

```tsx
<h1 className="text-black dark:text-white">
```

## Performance

`nthul` is designed to be fully tree-shakable and only includes the code you use. For example, if you only use the `useTheme` hook, the rest of the library's code will be removed during the build process.

## Contributing

We welcome contributions! Please check out the [Contributing Guide](https://github.com/react18-tools/nextjs-themes-ultra/blob/main/CONTRIBUTING.md) for more details.

### 🤩 Don't forget to star [this repo](https://github.com/react18-tools/nextjs-themes-ultra)!

Looking for a hands-on course to get started with Turborepo? Check out [React and Next.js with TypeScript](https://mayank-chaudhari.vercel.app/courses/react-and-next-js-with-typescript) and [The Game of Chess with Next.js, React, and TypeScript](https://www.udemy.com/course/game-of-chess-with-nextjs-react-and-typescrypt/?referralCode=851A28F10B254A8523FE).

![Repo Stats](https://repobeats.axiom.co/api/embed/85eec5cd9a0ede65ac366f834ada1a170ef775c8.svg "Repobeats analytics image")

## License

[MPL-2.0](https://github.com/react18-tools/nextjs-themes-ultra/blob/main/LICENSE)

Feel free to use, modify, and distribute this library as per the terms of the MPL-2.0 license.

> <img src="https://github.com/react18-tools/nextjs-themes-ultra/blob/main/popper.png?raw=true" style="height: 20px"/> Please consider enrolling in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsoring](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
