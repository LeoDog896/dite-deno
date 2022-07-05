import { UserDiteConfig } from "../diteConfig.ts";

export type CreateType = {
  path: string;
  content: string;
}[];

export interface Preset {
  config: UserDiteConfig;
  files: CreateType;
}
