import { build } from "../import/esbuild.ts";
import { serve } from "../import/http.ts";
import { toDiteConfig, UserDiteConfig } from "./diteConfig.ts";
import { brightBlue, green, VERSION } from "../cli/theme.ts";
import diteEntry from "./esbuild/dite-entry.ts";

const uuid = crypto.randomUUID();

export async function dev(config: UserDiteConfig, quiet = false) {
  const { port, plugins, entry, extension } = toDiteConfig(config);

  await serve(async (request) => {
    const url = new URL(request.url);

    // HOT stream
    if (url.pathname == "/_dite/hot") {
      let timer: number;
      const body = new ReadableStream({
        start(controller) {
          controller.enqueue(`${uuid}\n`);
          timer = setInterval(() => {
            controller.enqueue(`${uuid}\n`);
          }, 1000);
        },
        cancel() {
          clearInterval(timer);
        },
      });

      return new Response(body.pipeThrough(new TextEncoderStream()), {
        headers: {
          "content-type": "text/event-stream;",
        },
      });
    }

    // HOT JavaScript listener
    if (url.pathname == "/_dite/hot-reload.js") {
      return new Response(
        `(async () => {
  const hot = await fetch("/_dite/hot")
  const reader = hot.body.pipeThrough(new TextDecoderStream())
    .getReader();

  let charsReceived;
  let result;

  reader.read().then(function processText({ done, value }) {
    if (done) {
      console.log("Stream complete");
      para.textContent = value;
      return;
    }

    charsReceived += value.length;
    const chunk = value;
    console.log('Received ' + charsReceived + ' characters so far. Current chunk = ' + chunk);

    result += chunk;

    return reader.read().then(processText);
  });
})()`,
        {
          headers: {
            "Content-Type": "application/javascript",
          },
        },
      );
    }

    // Serve the entry file
    entry: {
      let name = url.pathname;

      name = name.replace(/\.js$/, "").replace(/^\//, "");

      const location = `./routes/${name}${extension}`;

      try {
        await Deno.stat(location);
      } catch {
        break entry;
      }

      const result = await build({
        entryPoints: ["dite-entry"],
        write: false,
        bundle: true,
        platform: "browser",
        plugins: [
          diteEntry(entry(location)),
          ...plugins,
        ],
        outfile: "bundle.js",
      });

      return new Response(
        new TextDecoder("utf-8").decode(result.outputFiles[0].contents),
        {
          headers: {
            "Content-Type": "text/javascript",
          },
        },
      );
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

      return new Response(
        (await Deno.readTextFile("index.html")).replace(
          "%head%",
          '<script src="/_dite/hot-reload.js"></script>',
        ).replace("%body%", `<script src="/${name}.js"></script>`),
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
        console.log();
        console.log(`    ${brightBlue("Dite")} ${green(VERSION)}`);
        console.log(
          `    Listening at ${brightBlue(`http://localhost:${port}`)}.`,
        );
      }
    },
  });
}
