import { Plugin } from "../../import/esbuild.ts";

export default function entry(source: string): Plugin {
  return {
    name: "dite-entry",
    setup(build) {
      // Intercept import paths called "env" so esbuild doesn't attempt
      // to map them to a file system location. Tag them with the "env-ns"
      // namespace to reserve them for this plugin.
      build.onResolve({ filter: /^dite-entry$/ }, (args) => ({
        path: args.path,
        namespace: "dite-entry",
      }));

      // Load paths tagged with the "env-ns" namespace and behave as if
      // they point to a JSON file containing the environment variables.
      build.onLoad({ filter: /.*/, namespace: "dite-entry" }, () => ({
        contents: source,
        loader: "ts",
        resolveDir: ".",
      }));
    },
  };
}
