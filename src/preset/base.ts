import { PresetSelf } from "./preset.ts";
import { join } from "../../import/path.ts";

export const base = (
  preset: string,
  permission = "--allow-read --allow-write --allow-env --allow-run --allow-net",
): PresetSelf => ({
  files: [
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
      content: `import ${preset} from "dite/preset/${preset}.ts";
import { dev } from "dite/dev.ts";
import { UserDiteConfig } from "dite/diteConfig.ts"

const config: UserDiteConfig = {
  ...${preset}().config,
}

await dev(config)
      `,
    },
  ],
  denoConfig: {
    imports: {
      "dite": join(Deno.mainModule, "./../../src/mod.ts"),
      "dite/": join(Deno.mainModule, "./../../src/"),
      "$lib/": "./lib/",
    },
    tasks: {
      dev:
        `deno run --quiet ${permission} --unstable --import-map=deno.json --watch=routes,lib,dev.ts,index.html ./dev.ts`,
      start:
        `deno run --quiet ${permission} --unstable --import-map=deno.json --watch=routes,lib,dev.ts,index.html ./dev.ts --production`,
      build:
        `deno run --quiet ${permission} --unstable --import-map=deno.json ./build.ts`,
      check: "deno fmt; deno lint",
    },
    compilerOptions: {
      lib: ["dom"],
    },
  },
  config: {
    entry: () => {
      throw Error(
        "Cannot use entry of base module! Make sure to specify a preset in `dev.ts` or `build.ts`.",
      );
    },
  },
});
