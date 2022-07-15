import { Preset } from "./preset.ts";
import { base } from "./base.ts";
import { deepmerge } from "../../import/deepmerge.ts";

const self = base("react");

const react: Preset = () => ({
  config: {
    ...self.config,
    entry: (fileName) =>
      `import render from "${fileName}";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("app"));

root.render(render())
`,
    extension: ".tsx",
  },
  files: [
    ...self.files,
    {
      path: "routes/index.tsx",
      content: `import * as React from "react";

export default function Render() {
  return (
    <main>
      <h1>Hello React!</h1>
    </main>
  )
}

`,
    },
  ],
  denoConfig: deepmerge(self.denoConfig, {
    imports: {
      "react": "https://esm.sh/react@18.2.0",
      "react-dom": "https://esm.sh/react-dom@18.2.0",
      "react-dom/": "https://esm.sh/react-dom@18.2.0?path=/",
      "react/": "https://esm.sh/react@18.2.0?path=/",
    },
  }),
});

export default react;
