import { Command } from "https://deno.land/x/cliffy@v0.24.2/command/command.ts";
import vscode from "./vscode.ts";
import webview from "./webview.ts";
import vanillaTailwind from "./vanilla/tailwind.ts";

export const additions: { [key: string]: Command | undefined } = {
  vscode,
  webview,
  "vanilla/tailwind": vanillaTailwind,
};
