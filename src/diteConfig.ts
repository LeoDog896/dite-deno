import { Plugin } from "../import/drollup.ts"

export interface DiteConfig {
  port: number;
  plugins: Plugin[];
}

export type UserDiteConfig = Partial<DiteConfig>;

const defaultDiteConfig: DiteConfig = {
  port: 3000,
  plugins: []
}

export function toDiteConfig(userConfig: UserDiteConfig): DiteConfig {
  return {
    ...defaultDiteConfig,
    ...userConfig
  };
}