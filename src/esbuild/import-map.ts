import { Plugin } from "../../import/esbuild.ts";
import { join } from "../../import/path.ts";

interface ImportMap {
  imports: {
    [key: string]: string | undefined;
  }
}

export default function import_map(map: ImportMap): Plugin {
  return {
    name: "import-map",
    setup(build) {
      build.onResolve({ filter: /.*/ }, args => {
        const paths = Object.keys(map.imports)

        for (const path of paths) {
          if (path.endsWith("/")) {
            if (args.path.startsWith(path)) {
              return {
                path: join(Deno.cwd(), args.path.replace(path, map.imports[path]!)),
              }
            }
          } else {
            if (path === args.path) {
              return {
                path: map.imports[path]!,
              }
            }
          }
        }
      });
    }
  };
}
