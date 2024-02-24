# Nextjs-Themes-Ultralight

[![test](https://github.com/react18-tools/nextjs-themes-ultralight/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/nextjs-themes-ultralight/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/85f6447e649201924a2c/maintainability)](https://codeclimate.com/github/react18-tools/nextjs-themes-ultralight/maintainability) [![codecov](https://codecov.io/gh/react18-tools/nextjs-themes-ultralight/graph/badge.svg)](https://codecov.io/gh/react18-tools/nextjs-themes-ultralight) [![Version](https://img.shields.io/npm/v/nthul.svg?colorB=green)](https://www.npmjs.com/package/nthul) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/dt/nthul.svg)](https://www.npmjs.com/package/nthul) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/nthul) [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

🤟 👉 [Unleash the Power of React Server Components](https://medium.com/javascript-in-plain-english/unleash-the-power-of-react-server-components-eb3fe7201231)

> A canonical package with a longer and more descriptive name is also published - `nextjs-themes-ultralight`

## Motivation

I created `nextjs-themes` library to achieve functionality like `next-themes` with React Server Components. It worked well, however, I noticed issues with tree-shaking and also found that some functions that are rarely used can be removed or replaced to improve overall performance and readability.

I will update the main library [`nextjs-themes`](https://github.com/react18-tools/nextjs-themes). However, it requires ensuring minimal changes to the existing APIs. And thus I created a new library, which has the potential to be a better alternative in most cases.

## Features

✅ Perfect dark mode in 2 lines of code

✅ Works with Tailwind CSS

✅ Fully Treeshakable (`import from nthul/client/theme-switcher`)

✅ Designed for excellence

✅ Full TypeScript Support

✅ Unleash the full power of React18 Server components

✅ System setting with prefers-color-scheme

✅ Themed browser UI with color-scheme

✅ Support for Next.js 13 & Next.js 14 `appDir`

✅ No flash on load (for all - SSG, SSR, ISG, Server Components)

✅ Sync theme across tabs and windows - can opt-out by passing dontSync to ThemeSwitcher

✅ Apply custom transition when changing themes

✅ Force pages to specific themes - requires assigning className (detailed techniques comming soon...)

✅ Manipulate theme via `useTheme` hook

✅ Documented with [Typedoc](https://react18-tools.github.io/nextjs-themes-ultralight) ([Docs](https://react18-tools.github.io/nextjs-themes-ultralight))

✅ Use combinations of `th-` and `dark` or `light` classes for dark/light variants of themes

✅ Automatically avoids storing cookies when not using the corresponding `ServerTarget`

✅ Works with all build systems/tools/frameworks for React18

> Feel free to [request](https://github.com/react18-tools/nextjs-themes-ultralight/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=) or [discuss](https://github.com/react18-tools/nextjs-themes-ultralight/discussions) new features or [report bugs](https://github.com/react18-tools/nextjs-themes-ultralight/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=).

## Install

> A canonical package with a longer and more descriptive name is also published - `nextjs-themes-ultralight`

```bash
$ pnpm add nthul
```

or

```bash
$ npm install nthul
```

or

```bash
$ yarn add nthul
```

## Want Lite Version? [![npm bundle size](https://img.shields.io/bundlephobia/minzip/nthul-lite)](https://www.npmjs.com/package/nthul-lite) [![Version](https://img.shields.io/npm/v/nthul-lite.svg?colorB=green)](https://www.npmjs.com/package/nthul-lite) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/dt/nthul-lite.svg)](https://www.npmjs.com/package/nthul-lite)

```bash
$ pnpm add nthul-lite
```

**or**

```bash
$ npm install nthul-lite
```

**or**

```bash
$ yarn add nthul-lite
```

> You need r18gs as a peer-dependency

## Usage

> Please explore `examples` and `packages/shared-ui` for working examples. (updates coming soon...)

### SPA (e.g., Vite, CRA) and Next.js pages directory (No server components)

The best way is to add a [Custom `App`](https://nextjs.org/docs/advanced-features/custom-app) to use by modifying `_app` as follows:

Adding dark mode support takes 2 lines of code:

```js
import { ThemeSwitcher, ColorSwitch } from "nthul/client"; // for better tree-shaking

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeSwitcher />
      {/* to add a switch */}
      <header>
        <ColorSwitch />
      </header>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
```

⚡🎉Boom! Just a couple of lines and your dark mode is ready! That too with an awesome color switch for user preferred settings.

Check out examples for advanced usage.

> For `vite` or any other build tool you can find a similar root component. E.g., <App /> component in `CRA` and `vite`.

### With Next.js `app` router (Server Components)

> If your app is mostly serving static content, you do not want the overhead of SSR.
>
> When using this approach, you need to use CSS general sibling Combinator (~) to make sure your themed CSS is properly applied. See (HTML & CSS)[#html--css].

Update your `app/layout.jsx` to add `ThemeSwitcher`, and `ServerTarget`. `ServerTarget` is required to avoid a flash of un-themed content on reload.

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

⚡🎉 Woohoo! You just added multiple theme and color-scheme modes and you can also use Server Component! Isn't that awesome?

### ColorSwitch

An elegant color-switch to toggle coloe-schemes ("dark" | "light" | "system").

```tsx
<ColorSwitch />
```

### HTML & CSS

That's it, your Next.js app fully supports dark mode, including System preference with `prefers-color-scheme`. The theme is also immediately synced between tabs. By default, `nextjs-themes-ultralight` modifies the className on the `html` element, which you can easily use to style your app:

```css
:root {
  /* Your default theme */
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

/* for scoped containers add .nth-scoped call as well - required only when using containerised themes. */
.nth-scoped.th-.dark { /* use th- to make sure outer theme is not applied to container with no theme  */
  ...
}

.nth-scoped.th-theme.dark {
  ...
}
```

Also see [Example CSS file](https://github.com/react18-tools/nextjs-themes-ultralight/blob/main/packages/shared-ui/src/globals.css)

#### When using `ServerTarget`

when using `ServerTarget`, you need to use CSS general sibling Combinator (~) as `ServerTarget` is not wrapping your app.

> Replace `.selector` with a combination of selectors from the description above.

```css
/*
for the target element itself, e.g., the html tag.
in most cases, this is inherited by all child elements.
*/
.selector,

/* for forcing to the child elements. */
.selector *,

/* when using ServerTarget */

.selector ~ *, // for all following siblings

.selector ~ * * // for all the children of the following siblings
{
  // ...your styles
}

```

Please note that we have not added a comma (',') after the last selector.

Without comments, it should look like following.

```css
.selector,
.selector *,
.selector ~ *,
.selector ~ * * {
  --th-variable: value;
}
```

We encourage you to use this pattern for defining your theme variables in CSS to avoid any unwanted overrides.

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
      src = "/light.png";
      break;
    case "dark":
      src = "/dark.png";
      break;
    default:
      src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      break;
  }

  return <Image src={src} width={400} height={400} />;
}

export default ThemedImage;
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

> We are open to listening your feedback - [Discussions](https://github.com/react18-tools/nextjs-themes-ultralight/discussions)

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

# Contributing

## What's inside?

### Utilities

This Turborepo template includes pre-configured tools:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- Plop based code generator for scaffolding new components
- Automatically rebrand this template to match your repo name

### Apps and Packages

This Turborepo includes the following packages/examples/lib:

- `nextjs`: a [Next.js](https://nextjs.org/) app
- `vite`: a [Vite.js](https://vitest.dev) app
- `fork-me`: a React component library shared by both `Next.js` and `Vite` examples
- `eslint-config-custom`: ESLint configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/example is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
cd nthul
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd nthul
pnpm dev
```

### 🤩 Don't forger to start [this repo](https://github.com/react18-tools/nextjs-themes-ultralight)!

Want hands-on course for getting started with Turborepo? Check out [React and Next.js with TypeScript](https://mayank-chaudhari.vercel.app/courses/react-and-next-js-with-typescript) and [The Game of Chess with Next.js, React and TypeScrypt](https://www.udemy.com/course/game-of-chess-with-nextjs-react-and-typescrypt/?referralCode=851A28F10B254A8523FE)

![Repo Stats](https://repobeats.axiom.co/api/embed/85eec5cd9a0ede65ac366f834ada1a170ef775c8.svg "Repobeats analytics image")

## License

Licensed as MIT open source.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
