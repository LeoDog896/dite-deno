import { Command } from "https://deno.land/x/cliffy@v0.25.4/command/mod.ts";
import { blue, white } from "../theme.ts";

export default new Command()
  .name("webview")
  .description("Add webview integration to your project")
  .action(async () => {
    await Deno.writeTextFile(
      `webview.ts`,
      `import { Webview } from "https://deno.land/x/webview@0.7.5/mod.ts";
import { config } from "./dev.ts"
const webview = new Webview();

const url = \`http://localhost:\${config.port ?? 3000}\`

// Retry until the URL is loaded
{
  let fetchSuccesful = false

  do {
    try {
      const { status } = await fetch(url)

      if (status === 200) {
        fetchSuccesful = true;
      }
    } catch {
      fetchSuccesful = false;
    }
  } while (!fetchSuccesful)
}

console.log("    Webview running!")

webview.navigate(url);
webview.run();
`,
    );

    await Deno.writeTextFile(
      "deno.json",
      (await Deno.readTextFile("deno.json")).replace(
        `"dev": "`,
        `"dev": "deno run -A --quiet --unstable --import-map=import_map.json ./webview.ts & `,
      ),
    );

    console.log(
      `Added %cwebview!"`,
      blue,
      white,
    );
  });
