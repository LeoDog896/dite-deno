import { Add } from "./add.ts";

export default <Add> {
  files: [
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
  ],
};
