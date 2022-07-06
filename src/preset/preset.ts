import { UserDiteConfig } from "../diteConfig.ts";

export type CreateType = {
  path: string;
  content: string;
}[];

/** Options that the preset may respectfully decline */
export interface PresetOptions {
  /** If this is true, the preset should try to use minimal content. */
  barebones?: boolean;
}

export interface PresetSelf {
  config: UserDiteConfig;
  files: CreateType;
  importMap: { [key: string]: string };
}

export type Preset = (options: PresetOptions) => PresetSelf;
