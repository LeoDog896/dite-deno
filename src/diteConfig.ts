import { Plugin } from "../import/drollup.ts";

export interface DiteConfig {
  port: number;
  plugins: Plugin[];
  /** Generates the entry string. fileName is necessary to import the file. */
  entry: (fileName: string) => string;
}

/* Makes all properites of T optional except O */
type PartialExcept<T, O extends keyof T> = Partial<T> & Pick<T, O>;

export type UserDiteConfig = PartialExcept<DiteConfig, "entry">;

export const defaultDiteConfig: Omit<DiteConfig, "entry"> = {
  port: 3000,
  plugins: [],
};

export function toDiteConfig(userConfig: UserDiteConfig): DiteConfig {
  return {
    ...defaultDiteConfig,
    ...userConfig,
  };
}
