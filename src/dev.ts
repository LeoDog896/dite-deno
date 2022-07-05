import { rollup } from "../import/drollup.ts";
import { serve } from "../import/http.ts";
import { toDiteConfig, UserDiteConfig } from "./diteConfig.ts";
import { blue } from "../cli/theme.ts";
import diteEntry from "./dite-entry.ts";

export async function dev(config: UserDiteConfig, quiet = false) {
  const { port, plugins, entry, extension } = toDiteConfig(config);

  await serve(async (request) => {
    const url = new URL(request.url);

    // HOT stream
    if (url.pathname == "/_dite/hot") {
      let timer: number;
      const body = new ReadableStream({
        start(controller) {
          timer = setInterval(() => {
            controller.enqueue("Hello, World!\n");
          }, 1000);
        },
        cancel() {
          clearInterval(timer);
        },
      });

      return new Response(body.pipeThrough(new TextEncoderStream()), {
        headers: {
          "content-type": "text/plain; charset=utf-8",
        },
      });
    }

    // HOT JavaScript listener
    if (url.pathname == "/_dite/hot-reload.js") {
      return new Response(`console.log("hot!")`, {
        headers: {
          "Content-Type": "application/javascript",
        },
      });
    }

    // Route processing
    route: {
      let name = url.pathname;

      if (name.endsWith("/")) {
        name += "index.html";
      }

      name = name.replace(/\.html$/, "").replace(/^\//, "");

      const location = `./routes/${name}${extension}`;

      try {
        await Deno.stat(location);
      } catch {
        break route;
      }

      const bundle = await rollup({
        input: "\0dite-entry",
        plugins: [
          diteEntry(entry(location)),
          ...plugins,
        ],
        output: {
          format: "esm",
          file: "bundle.js",
        },
      });

      const { output } = await bundle.generate({ format: "esm" });

      for (const chunkOrAsset of output) {
        if (chunkOrAsset.type === "asset") {
          console.log("Asset", chunkOrAsset);
        } else {
          console.log("Chunk", chunkOrAsset.code);
        }
      }

      bundle.close();

      return new Response(
        (await Deno.readTextFile("index.html")).replace(
          "%head%",
          '<script src="/_dite/hot-reload.js"></script>',
        ),
        {
          headers: {
            "Content-Type": "text/html",
          },
        },
      );
    }

    return new Response("404 Not Found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }, {
    port,
    onListen: () => {
      if (!quiet) {
        console.log(`Listening at ${blue(`http://localhost:${port}`)}.`);
      }
    },
  });
}
