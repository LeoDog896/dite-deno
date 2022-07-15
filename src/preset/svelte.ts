import { Preset } from "./preset.ts";
import { base } from "./base.ts";
import { sveltePlugin } from "../esbuild/svelte.ts";
import { deepmerge } from "../../import/deepmerge.ts";

const self = base("svelte");

const preact: Preset = () => ({
  config: {
    ...self.config,
    entry: (fileName) =>
      `import App from "${fileName}";

const app = new App({
  target: document.getElementById("app"),
});
`,
    extension: ".svelte",
    plugins: [
      sveltePlugin,
    ],
  },
  files: [
    ...self.files,
    {
      path: "routes/index.svelte",
      content: `<h1>Hello World!</h1>`,
    },
  ],
  denoConfig: deepmerge(self.denoConfig, {
    imports: {
      "svelte": "https://esm.sh/svelte@3.49.0",
      "svelte/": "https://esm.sh/svelte@3.49.0?path=/",
    },
  }),
});

export default preact;
