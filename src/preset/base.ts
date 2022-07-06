import { PresetSelf } from "./preset.ts";
import { join } from "../../import/path.ts";

export const base = (preset: string): PresetSelf => ({
  files: [
    {
      path: "deno.json",
      content: JSON.stringify(
        {
          tasks: {
            dev:
              "deno run -A --unstable --import-map=import_map.json --watch=routes,lib,dev.ts,index.html ./dev.ts",
            build:
              "deno run -A --unstable --import-map=import_map.json ./build.ts",
            check: "deno fmt; deno lint",
          },
          compilerOptions: {
            lib: ["dom"],
          },
        },
        null,
        2,
      ),
    },
    {
      path: "index.html",
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  %head%
</head>
<body>
  <div id="app"></div>
  %body%
</body>`,
    },
    {
      path: "dev.ts",
      content: `import { ${preset} } from "dite/preset/${preset}.ts";
import { dev } from "dite/dev.ts";

await dev({
  ...${preset}.config,
})
      `,
    },
  ],
  importMap: {
    "dite": join(Deno.mainModule, "./../../src/mod.ts"),
    "dite/": join(Deno.mainModule, "./../../src/"),
    "$lib/": "./lib/",
  },
  config: {
    entry: () => {
      throw Error("Cannot use entry of base module!");
    },
  },
});
