import {
  Command,
  EnumType,
} from "https://deno.land/x/cliffy@v0.24.2/command/mod.ts";
import { join } from "../../import/path.ts";
import { additions } from "./list.ts";
import { Add } from "./add.ts";
import { brightBlue } from "../theme.ts";

const addType = new EnumType(additions);

export const addCommand = new Command()
  .name("add")
  .description("Easily add new helpers to your project")
  .type("addType", addType)
  .arguments("<type:addType>")
  .example("Add vscode", "dite add vscode")
  .action(async (_, type) => {
    const { default: addition } = await import(`./${type}.ts`);

    const files = (addition as Add).files;

    files.forEach(async (file) => {
      await Deno.mkdir(
        join(Deno.cwd(), file.path.split("/").slice(0, -1).join("/")),
        { recursive: true },
      );
      await Deno.writeTextFile(join(Deno.cwd(), file.path), file.content, {
        create: true,
      });
    });

    console.log(`Added ${brightBlue(type)}!`);
  });
