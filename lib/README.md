# Nthul <img src="https://github.com/react18-tools/nextjs-themes-ultra/blob/main/popper.png?raw=true" style="height: 40px"/>

[![test](https://github.com/react18-tools/nextjs-themes-ultra/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/nextjs-themes-ultra/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/aa896ec14c570f3bb274/maintainability)](https://codeclimate.com/github/react18-tools/nextjs-themes-ultra/maintainability) [![codecov](https://codecov.io/gh/react18-tools/nextjs-themes-ultra/graph/badge.svg)](https://codecov.io/gh/react18-tools/nextjs-themes-ultra) [![Version](https://img.shields.io/npm/v/nthul.svg?colorB=green)](https://www.npmjs.com/package/nthul) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/nthul.svg)](https://www.npmjs.com/package/nthul) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/nthul) [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

Nthul is a comprehensive library designed to unlock the full potential of React 18 server components. It provides customizable loading animation components and a fullscreen loader container, seamlessly integrating with React and Next.js.

✅ Fully Treeshakable (import from `nthul/client/loader-container`)

✅ Fully TypeScript Supported

✅ Leverages the power of React 18 Server components

✅ Compatible with all React 18 build systems/tools/frameworks

✅ Documented with [Typedoc](https://react18-tools.github.io/nextjs-themes-ultra) ([Docs](https://react18-tools.github.io/nextjs-themes-ultra))

✅ Examples for Next.js, Vite, and Remix

> <img src="https://github.com/react18-tools/nextjs-themes-ultra/blob/main/popper.png?raw=true" style="height: 20px"/> Please consider starring [this repository](https://github.com/react18-tools/nextjs-themes-ultra) and sharing it with your friends.

## Getting Started

### Installation

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

### Import Styles

You can import styles globally or within specific components.

```css
/* globals.css */
@import "nthul/dist";
```

```tsx
// layout.tsx
import "nthul/dist/index.css";
```

For selective imports:

```css
/* globals.css */
@import "nthul/dist/client"; /** required if you are using LoaderContainer */
@import "nthul/dist/server/bars/bars1";
```

### Usage

Using loaders is straightforward.

```tsx
import { Bars1 } from "nthul/dist/server/bars/bars1";

export default function MyComponent() {
  return someCondition ? <Bars1 /> : <>Something else...</>;
}
```

For detailed API and options, refer to [the API documentation](https://react18-tools.github.io/nextjs-themes-ultra).

**Using LoaderContainer**

`LoaderContainer` is a fullscreen component. You can add this component directly in your layout and then use `useLoader` hook to toggle its visibility.

```tsx
// layout.tsx
<LoaderContainer />
	 ...
```

```tsx
// some other page or component
import { useLoader } from "nthul/dist/hooks";

export default MyComponent() {
	const { setLoading } = useLoader();
	useCallback(()=>{
		setLoading(true);
		...do some work
		setLoading(false);
	}, [])
	...
}
```

## License

This library is licensed under the MPL-2.0 open-source license.



> <img src="https://github.com/react18-tools/nextjs-themes-ultra/blob/main/popper.png?raw=true" style="height: 20px"/> Please consider enrolling in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsoring](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
