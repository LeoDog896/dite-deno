import { Application } from "../import/oak.ts";
import { toDiteConfig, UserDiteConfig } from "./diteConfig.ts";
import { build } from "./build.ts";

export async function dev(config: UserDiteConfig) {
  const { port } = toDiteConfig(config);

  await build(config);

  const app = new Application();

  app.use(async (context, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    context.response.headers.set("X-Response-Time", `${ms}ms`);
  });

  await app.listen({ port });
}
