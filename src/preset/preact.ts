import { Preset } from "./preset.ts";
import { base } from "./base.ts";
import { deepmerge } from "../../import/deepmerge.ts";

const self = base("preact");

const preact: Preset = () => ({
  config: {
    ...self.config,
    entry: (fileName) =>
      `import render from "${fileName}";
import { render as renderApp } from "preact";

renderApp(render(), document.getElementById("app"));
`,
    extension: ".tsx",
    esbuildOptions: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
    },
  },
  files: [
    ...self.files,
    {
      path: "routes/index.tsx",
      content: `import { h } from "preact";

export default function Render() {
  return (
    <main>
      <h1>Hello Preact!</h1>
      <p>Check out <a href="https://preactjs.com/">https://preactjs.com/</a> for more info.</p>
    </main>
  )
}

`,
    },
  ],
  denoConfig: deepmerge(self.denoConfig, {
    imports: {
      "preact": "https://esm.sh/preact@10.11.3",
      "preact/": "https://esm.sh/preact@10.11.3?path=//",
    },
  }),
});

export default preact;
