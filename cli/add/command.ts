import { Command } from "https://deno.land/x/cliffy@v0.24.2/command/mod.ts";
import { additions } from "./mod.ts";

const addCommandBase = new Command()
  .name("add")
  .description("Easily add new helpers to your project")
  .example("Add vscode", "dite add vscode");

addCommandBase.action(() => addCommandBase.showHelp());

for (const [key, addition] of Object.entries(additions)) {
  addCommandBase.command(key, addition!);
}

export const addCommand = addCommandBase;
