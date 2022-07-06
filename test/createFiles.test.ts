import { createFile } from "../util/createFile.ts";
import { assertEquals } from "https://deno.land/std@0.147.0/testing/asserts.ts";

Deno.test("files create right", async () => {
  await createFile({
    path: "./resources/test.txt",
    content: "Hello World",
  });

  assertEquals(await Deno.readTextFile("./resources/test.txt"), "Hello World");

  await Deno.remove("./resources/test.txt");
});
