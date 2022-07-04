import { Plugin } from "../import/drollup.ts";

export default function diteEntry(source: string): Plugin {
  return {
    name: "\0dite-entry",
    resolveId(source) {
      if (source === "\0dite-entry") {
        return source;
      }
      return null;
    },
    load(id) {
      if (id === "\0dite-entry") {
        return source;
      }
      return null;
    },
  };
}
