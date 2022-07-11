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
      <h1>Hello, world!</h1>
    </main>
  )
}

`,
    },
  ],
  denoConfig: deepmerge(self.denoConfig, {
    imports: {
      "preact": "https://esm.sh/preact@10.9.0",
      "preact/": "https://esm.sh/preact@10.9.0?path=/",
    },
  }),
});

export default preact;
