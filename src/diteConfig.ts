import { BuildOptions, Plugin } from "../import/esbuild.ts";

export interface DiteConfig {
  port: number;
  plugins: Plugin[];
  extension: string;
  esbuildOptions: BuildOptions;
  hostname: string;
  production: boolean;
  /** Generates the entry string. fileName is necessary to import the file. */
  entry: (fileName: string) => string;
  ready: () => void;
}

/* Makes all properites of T optional except O */
type PartialExcept<T, O extends keyof T> = Partial<T> & Pick<T, O>;

export type UserDiteConfig = PartialExcept<DiteConfig, "entry">;

export const defaultDiteConfig: Omit<DiteConfig, "entry"> = {
  port: 3000,
  hostname: "0.0.0.0",
  plugins: [],
  extension: ".ts",
  production: false,
  esbuildOptions: {},
  ready: () => void 0,
};

export function toDiteConfig(userConfig: UserDiteConfig): DiteConfig {
  return {
    ...defaultDiteConfig,
    ...userConfig,
  };
}
