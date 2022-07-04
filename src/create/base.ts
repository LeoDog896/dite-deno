import { CreateType } from "./createType.ts";

export const base: CreateType = {
  files: [
    {
      path: "deno.json",
      content: JSON.stringify(
        {
          tasks: {
            dev: "deno run -A --unstable --import-map=import_map.json ./dev.ts",
            build:
              "deno run -A --unstable --import-map=import_map.json ./build.ts",
          },
        },
        null,
        2,
      ),
    },
  ],
};
