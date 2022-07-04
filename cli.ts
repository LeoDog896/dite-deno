import { types as createTypes } from "./src/create/mod.ts"
import { join } from "https://deno.land/std@0.146.0/path/mod.ts";
import { blue, green, red } from "./src/theme.ts"
import { Confirm } from "https://deno.land/x/cliffy@v0.24.2/prompt/mod.ts";
import { Command, EnumType, CompletionsCommand, HelpCommand } from "https://deno.land/x/cliffy@v0.24.2/command/mod.ts";

async function askForEmpty(directory: string) {
  try {

    let found = false

    for await (const file of Deno.readDir(directory)) {
      if (file.isFile) {
        found = true;
        break;
      }
    }

    if (found) {
      const shouldContinue = await Confirm.prompt(`Directory is not empty. Continue?`);

      if (shouldContinue) {
        return;
      } else {
        Deno.exit(0)
      }
    }
  } catch {
    void 0;
  }
}

const createType = new EnumType(Object.keys(createTypes))

const startCommand = new Command()
  .name("create")
  .description("Create a new project with a type.")
  .type("createType", createType)
  .arguments("<type:createType> [directory:file]")
  .action(async (_, type, directory = "./") => {

    // Get the name of the directory (if it's ./, itll be the name of the last directory in the name)
    const directoryName = directory == "./" ? Deno.cwd().split("/").pop()! : directory;

    await askForEmpty(directory)

    createTypes[type]?.files?.forEach(async file => {
      // make any necessary directories THEN create the file
      await Deno.mkdir(join(directory, file.path.split("/").slice(0, -1).join("/")), { recursive: true })
      await Deno.writeTextFile(join(directory, file.path), file.content, { create: true })
    })

    console.log(`${green(`Project ${blue(directoryName)} created!`)}`)
  });

const main = new Command()
  .name("dite")
  .description("The deno framework for websites.")
  .version("0.0.1")
  .command("help", new HelpCommand().global())
  .command("completions", new CompletionsCommand())
  .command("create", startCommand);

try {
  await main.parse(Deno.args);
} catch (e) {
  console.error(`${red("error")}: ${e.message}`);
  Deno.exit(1)
}