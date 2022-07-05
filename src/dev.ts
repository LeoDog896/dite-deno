import { rollup } from "../import/drollup.ts";
import { Application, isHttpError } from "../import/oak.ts";
import { toDiteConfig, UserDiteConfig } from "./diteConfig.ts";
import { blue } from "../cli/theme.ts"
import diteEntry from "./dite-entry.ts";

export async function dev(config: UserDiteConfig, quiet = false) {
  const { port, plugins, entry, extension } = toDiteConfig(config);

  const app = new Application();

  app.use(async (context, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    context.response.headers.set("X-Response-Time", `${ms}ms`);
  });

  app.use(async (context, next) => {
    try {
      await next();
    } catch (err) {
      if (isHttpError(err)) {
        context.response.status = err.status;
        context.response.body = err.message;
      } else {
        context.response.status = 500;
        context.response.body = { error: err.message, info: JSON.stringify(err) };
        context.response.type = "json";
        console.error(err)
      }
    }
  });

  app.use(async (context, next) => {

    let name = context.request.url.pathname;

    if (name.endsWith("/")) {
      name += "index.html";
    }

    name = name.replace(/\.html$/, "").replace(/^\//, "");

    const location = `./routes/${name}${extension}`;

    try {
      await Deno.stat(location)
    } catch {
      await next();
      return;
    }

    const bundle = await rollup({
      input: "\0dite-entry",
      plugins: [
        diteEntry(entry(location)),
        ...plugins,
      ],
      output: {
        format: "esm",
        file: "bundle.js"
      }
    });

    const { output } = await bundle.generate({ format: "esm" });

    for (const chunkOrAsset of output) {
      if (chunkOrAsset.type === 'asset') {
        console.log('Asset', chunkOrAsset);
      } else {
        console.log('Chunk', chunkOrAsset.code);
      }
    }

    context.response.body = await Deno.readTextFile("index.html");
  });

  if (!quiet) {
    console.log(`Listening at ${blue(`http://localhost:${port}`)}`);
  }

  await app.listen({ port });
}
