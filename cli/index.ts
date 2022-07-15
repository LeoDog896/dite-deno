import { VERSION } from "./theme.ts";
import {
  Command,
  CompletionsCommand,
  HelpCommand,
} from "https://deno.land/x/cliffy@v0.24.2/command/mod.ts";
import {
  DenoLandProvider,
  GithubProvider,
  UpgradeCommand,
} from "https://deno.land/x/cliffy@v0.24.2/command/upgrade/mod.ts";
import { createCommand } from "./create/command.ts";
import { addCommand } from "./add/command.ts";

const main = new Command()
  .name("dite")
  .description("The deno framework for websites.")
  .version(VERSION)
  .command("help", new HelpCommand().global())
  .command("completions", new CompletionsCommand())
  .command("create", createCommand)
  .command("add", addCommand)
  .command(
    "upgrade",
    new UpgradeCommand({
      provider: [
        new DenoLandProvider({ name: "dite" }),
        new GithubProvider({ repository: "LeoDog896/dite" }),
      ],
    }),
  );

try {
  if (Deno.args.length === 0) {
    main.showHelp();
    Deno.exit(0);
  }

  await main.parse();
} catch (e) {
  console.error(`%cerror: ${e.message}`, "color: red");
  Deno.exit(1);
}
