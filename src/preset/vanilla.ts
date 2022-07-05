import { Preset } from "./preset.ts";
import { base } from "./base.ts";

export const vanilla: Preset = {
  config: {
    entry: (fileName) => `import "${fileName}"`,
  },
  files: [...base("vanilla")],
};
