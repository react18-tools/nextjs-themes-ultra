import { defineConfig, type Options } from "tsup";
import react18Plugin from "esbuild-plugin-react18";

export default defineConfig(
  (options: Options) =>
    ({
      format: ["cjs", "esm"],
      target: "es2019",
      entry: ["./src"],
      sourcemap: false,
      clean: !options.watch,
      bundle: true,
      minify: !options.watch,
      esbuildPlugins: [react18Plugin()],
      ...options,
    }) as Options,
);
