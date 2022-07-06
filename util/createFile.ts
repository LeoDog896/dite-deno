import { join } from "../import/path.ts";

export const createFile = async (
  file: { path: string; content: string },
  directory = Deno.cwd(),
) => {
  await Deno.mkdir(
    join(directory, file.path.split("/").slice(0, -1).join("/")),
    { recursive: true },
  );
  await Deno.writeTextFile(join(directory, file.path), file.content, {
    create: true,
  });
};
