import { Command } from "https://deno.land/x/cliffy@v0.24.2/command/mod.ts";
import { deepmerge } from "../../../import/deepmerge.ts";
import { blue, white } from "../../theme.ts";

export default new Command()
  .name("vanilla/tailwind")
  .description("Add tailwind for vanilla projects")
  .action(async () => {
    const json = JSON.parse(await Deno.readTextFile("deno.json"));

    Deno.writeTextFile(
      "deno.json",
      deepmerge(json, {
        imports: {
          "twind": "https://esm.sh/twind@0.16.17",
          "twind/": "https://esm.sh/twind@0.16.17?path=/",
        },
      }),
    );

    console.log(
      `Added %cvanilla/tailwind! %cMake sure to add the reccomended Deno extension if necessary."`,
      blue,
      white,
    );
  });
