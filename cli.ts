import { types as createTypes } from "./src/create/mod.ts"
import { parse } from "https://deno.land/std@0.146.0/flags/mod.ts";
import { join } from "https://deno.land/std@0.146.0/path/mod.ts";
import { red, green, blue } from "./src/theme.ts"
import { Confirm } from "https://deno.land/x/cliffy@v0.24.2/prompt/mod.ts";

async function askForEmpty(directory: string) {
  try {
    for await (const file of Deno.readDir(directory)) {
      if (file.isFile) {
        const shouldContinue = await Confirm.prompt(`Directory is not empty. Continue?`);

        if (shouldContinue) {
          return;
        } else {
          Deno.exit(0)
        }
      }
    }
  } catch {
    void 0;
  }
}

const rawArgs = parse(Deno.args)

const args = {
  ...rawArgs,
  _: rawArgs._.map(arg => typeof arg === "number" ? arg.toString() : arg)
}

if (args._[0] == "create") {
  const type = args._[1]
  
  if (type in createTypes === false) {
    if (type == undefined) {
      console.error(`Please specify a type: (${Object.keys(createTypes).join(", ")})`)
    } else {
      console.error(`${red("Unknown type:")} ${type}`)
    }

    Deno.exit(1)
  }

  const directory = args._[2] ?? "./"

  askForEmpty()

  createTypes[type]?.files?.forEach(async file => {
    // make any necessary directories THEN create the file
    await Deno.mkdir(join(directory, file.path.split("/").slice(0, -1).join("/")), { recursive: true })
    await Deno.writeTextFile(join(directory, file.path), file.content, { create: true })
  })

  console.log(`${green(`Project ${(blue(args._[2] + " ") ?? "")}created!`)}`)
}