import { vanilla } from "dite/preset/vanilla.ts";
import { dev } from "dite/dev.ts";

await dev({
  ...vanilla.config,
});
