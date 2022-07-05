import { red, VERSION } from "./theme.ts";
import {
  Command,
  CompletionsCommand,
  HelpCommand,
} from "https://deno.land/x/cliffy@v0.24.2/command/mod.ts";
import { createCommand } from "./create/command.ts";

const main = new Command()
  .name("dite")
  .description("The deno framework for websites.")
  .version(VERSION)
  .command("help", new HelpCommand().global())
  .command("completions", new CompletionsCommand())
  .command("create", createCommand);

try {
  if (Deno.args.length === 0) {
    main.showHelp();
    Deno.exit(0);
  }

  await main.parse(Deno.args);
} catch (e) {
  console.error(`${red("error")}: ${e.message}`);
  Deno.exit(1);
}
