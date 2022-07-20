import { Command } from "https://deno.land/x/cliffy@v0.24.2/command/mod.ts";
import { blue } from "../theme.ts";
import { deepmerge } from "../../import/deepmerge.ts";
export default new Command()
  .name("twind")
  .description("Add twind integration to your project")
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
      `Added %ctwind!"`,
      blue,
    );
  });
