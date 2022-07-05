import { Plugin } from "../../import/esbuild.ts";

export default function entry(source: string): Plugin {
  return {
    name: "dite-entry",
    setup(build) {
      build.onResolve({ filter: /^dite-entry$/ }, (args) => ({
        path: args.path,
        namespace: "dite-entry",
      }));

      build.onLoad({ filter: /.*/, namespace: "dite-entry" }, () => ({
        contents: source,
        loader: "ts",
        resolveDir: ".",
      }));
    },
  };
}
