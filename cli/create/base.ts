import { CreateType } from "./createType.ts";

export function base(): CreateType {
  return [
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
  %body%
</body>`
    }
  ]
}