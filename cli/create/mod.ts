import { CreateType } from "../../src/preset/preset.ts";
import { vanilla } from "../../src/preset/vanilla.ts";

export const types: { [key: string]: CreateType | undefined } = {
  vanilla: vanilla.files,
};
