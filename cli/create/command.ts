import { types as createTypes } from "./list.ts";
import { createFile } from "../../util/createFiles.ts";
import { join } from "../../import/path.ts";
import { brightBlue, gray, green } from "../theme.ts";
import { Confirm } from "https://deno.land/x/cliffy@v0.24.2/prompt/mod.ts";
import {
  Command,
  EnumType,
} from "https://deno.land/x/cliffy@v0.24.2/command/mod.ts";
import { Preset } from "../../src/preset/preset.ts";

/**
 * Don't let the user accidently override files by asking to continue if the directory isn't empty.
 *
 * The process will exit with code 0 if the user does not want to continue.
 *
 * @param directory The directory to check against
 */
async function askForEmpty(directory: string): Promise<void> {
  try {
    let found = false;

    for await (const file of Deno.readDir(directory)) {
      if (file.isFile) {
        found = true;
        break;
      }
    }

    if (found) {
      const shouldContinue = await Confirm.prompt(
        `Directory is not empty. Continue?`,
      );

      if (shouldContinue) {
        return;
      } else {
        Deno.exit(0);
      }
    }
  } catch {
    void 0;
  }
}

const createType = new EnumType(createTypes);

export const createCommand = new Command()
  .name("create")
  .description("Create a new project with a type.")
  .type("createType", createType)
  .arguments("<type:createType> [directory:file]")
  .example("Simple vanilla project", "dite create vanilla")
  .example("Create svelte project in a directory", "dite create svelte my-app")
  .option("-b, --barebones", "makes the template barebones.")
  .action(async ({ barebones }, type, directory = "./") => {
    // Get the name of the directory (if it's ./, itll be the name of the last directory in the name)
    const directoryName = directory == "./"
      ? Deno.cwd().split("/").pop()!
      : directory;

    await askForEmpty(directory);

    // Since the user will (most likely) be using the preset anyway, better to import and download all of the dependencies now.
    const { default: preset } = await import(
      "../../src/preset/" + type + ".ts"
    );

    const presetData = (preset as Preset)({ barebones });

    presetData.files.forEach((file) => createFile(file, directory));

    await Deno.writeTextFile(
      join(directory, "import_map.json"),
      JSON.stringify(
        {
          files: presetData.importMap,
        },
        null,
        2,
      ),
    );

    console.log(
      `${
        green(
          `Project ${brightBlue(directoryName)} created! ${
            barebones ? gray("(barebones)") : ""
          }`,
        )
      }`,
    );
  });
