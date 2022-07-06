import { Command } from "https://deno.land/x/cliffy@v0.24.2/command/mod.ts";
import { createFile } from "../../util/createFiles.ts";
import { brightBlue } from "../theme.ts";

const files = [
  {
    path: ".vscode/settings.json",
    content: JSON.stringify(
      {
        "deno.enable": true,
        "deno.unstable": true,
      },
      null,
      2,
    ),
  },
  {
    path: ".vscode/extensions.json",
    content: JSON.stringify(
      {
        "recommendations": [
          "denoland.vscode-deno",
        ],
      },
      null,
      2,
    ),
  },
];

export default new Command()
  .name("vscode")
  .description("Add vscode integration to your project")
  .action(() => {
    files.forEach((file) => createFile(file));
    console.log(
      `Added ${
        brightBlue("vscode")
      }! Make sure to add the reccomended Deno extension if necessary."`,
    );
  });
