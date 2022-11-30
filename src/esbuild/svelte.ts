import { Plugin } from "../../import/esbuild.ts";
import * as path from "../../import/path.ts";
import * as svelte from "https://esm.sh/svelte@3.53.1/compiler";
import { transform } from "../../import/esbuild.ts";

export type SveltePlugin = Exclude<
  Parameters<typeof svelte.preprocess>[1],
  unknown[]
>;

async function preprocess(
  source: string,
  filename: string,
  plugins: SveltePlugin[],
): Promise<string> {
  const { code } = await svelte.preprocess(source, [...plugins, {
    script: async ({ content, attributes }) => {
      if (attributes.lang === "ts") {
        const buildResult = await transform(content);

        return {
          code: buildResult.code,
        };
      }

      return {
        code: content,
      };
    },
  }], {
    filename,
  });

  return code;
}

interface Point {
  line: number;
  column: number;
}

export const sveltePlugin = (plugins?: SveltePlugin[]): Plugin => ({
  name: "svelte",
  setup(build) {
    build.onLoad({ filter: /\.svelte$/ }, async (args) => {
      // This converts a message in Svelte's format to esbuild's format
      const convertMessage = (
        { message, start, end }: {
          message: string;
          start?: Point;
          end?: Point;
        },
      ) => {
        let location;
        if (start && end) {
          const lineText = source.split(/\r\n|\r|\n/g)[start.line - 1];
          const lineEnd = start.line === end.line
            ? end.column
            : lineText.length;
          location = {
            file: filename,
            line: start.line,
            column: start.column,
            length: lineEnd - start.column,
            lineText,
          };
        }
        return { text: message, location };
      };

      // Load the file from the file system
      const source = await Deno.readTextFile(args.path);
      const filename = path.relative(Deno.cwd(), args.path);

      const code = await preprocess(source, filename, plugins ?? []);

      // Convert Svelte syntax to JavaScript
      try {
        const { js, warnings } = svelte.compile(code, { filename });
        const contents = js.code + `//# sourceMappingURL=` + js.map.toUrl();
        return { contents, warnings: warnings.map(convertMessage) };
      } catch (e) {
        return { errors: [convertMessage(e)] };
      }
    });
  },
});
