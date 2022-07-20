import { UserDiteConfig } from "../diteConfig.ts";

export type CreateType = {
  path: string;
  content: string;
}[];

/** Options that the preset may respectfully decline */
export type PresetOptions<E = Record<never, never>> = E & {
  /** If this is true, the preset should try to use minimal content. */
  barebones?: boolean;
};

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

export type Preset<E = Record<never, never>> = (
  options?: PresetOptions<E>,
) => PresetSelf;
