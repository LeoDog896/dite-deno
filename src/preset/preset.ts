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

interface DenoConfig {
  tasks?: { [key: string]: string };
  imports?: { [key: string]: string };
  compilerOptions?: {
    lib?: string[];
  };
}

export interface PresetSelf {
  config: UserDiteConfig;
  files: CreateType;
  denoConfig: DenoConfig;
}

export type Preset = (options?: PresetOptions) => PresetSelf;
