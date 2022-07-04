import { UserDiteConfig, toDiteConfig } from './diteConfig.ts';
import { rollup } from '../import/drollup.ts';
import diteEntry from "./dite-entry.ts";

export async function build(config: UserDiteConfig) {
  const diteConfig = toDiteConfig(config);

  await rollup({
    plugins: [
      diteEntry(),
      ...diteConfig.plugins
    ]
  })
}