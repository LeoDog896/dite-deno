import { rollup } from "../import/drollup.ts";
import { Application } from "../import/oak.ts";
import { toDiteConfig, UserDiteConfig } from "./diteConfig.ts";
import diteEntry from "./dite-entry.ts";

export async function dev(config: UserDiteConfig) {
  const { port, plugins, entry } = toDiteConfig(config);

  const app = new Application();

  app.use(async (context, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    context.response.headers.set("X-Response-Time", `${ms}ms`);
  });

  app.use(async (context, next) => {
    await rollup({
      plugins: [
        diteEntry(entry(context.request.url.href)),
        ...plugins,
      ],
    });

    await next();
  });

  await app.listen({ port });
}
