import { join } from "../import/path.ts";

/**
 * Small utility to create a new file given JSON data
 * @param file The file to put. This can take `/`s, such as "folder/index.html"
 * @param directory The **working directory**. Not to be confused with the directory name to put the file in.
 */
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
