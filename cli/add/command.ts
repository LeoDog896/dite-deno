import {
  Command,
  EnumType,
} from "https://deno.land/x/cliffy@v0.24.2/command/mod.ts";
import { additions } from "./mod.ts";

const addType = new EnumType(Object.keys(additions));

const addCommandBase = new Command()
  .name("add")
  .description("Easily add new helpers to your project")
  .type("addType", addType)
  .arguments("<type:addType>")
  .example("Add vscode", "dite add vscode")

Object.keys(additions).forEach(addition => {
  addCommandBase.command(addition, additions[addition]!)
})

export const addCommand = addCommandBase