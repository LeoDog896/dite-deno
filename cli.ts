import { types as createTypes } from "./src/create/mod.ts"
import { parse } from "https://deno.land/std@0.146.0/flags/mod.ts";
import { join } from "https://deno.land/std@0.146.0/path/mod.ts";

const rawArgs = parse(Deno.args)

const args = {
  ...rawArgs,
  _: rawArgs._.map(arg => typeof arg === "number" ? arg.toString() : arg)
}

if (args._[0] == "create") {
  const type = args._[1]
  
  if (type !in createTypes) {
    if (type == undefined) {
      console.error(`Please specify a type: (${Object.keys(createTypes).join(", ")})`)
    } else {
      console.error(`Unknown type: ${type}`)
    }

    Deno.exit(1)
  }

  const directory = args._[2] || "."

  createTypes[type]?.files?.forEach(async file => {
    await Deno.writeTextFile(join(directory, file.path), file.content)
  })
}