import { Preset } from "./preset.ts";
import { base } from "./base.ts";

const self = base("svelte");

const preact: Preset = () => ({
  config: {
    ...self.config,
    entry: (fileName) => `import "${fileName}"`,
    extension: ".svelte",
  },
  files: [
    ...self.files,
  ],
  importMap: {
    ...self.importMap,
  },
});

export default preact;
