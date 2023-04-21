import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/command.ts";
import vscode from "./vscode.ts";
import webview from "./webview.ts";
import twind from "./twind.ts";
import gitpod from "./gitpod.ts";

export const additions: { [key: string]: Command | undefined } = {
  vscode,
  webview,
  twind,
  gitpod,
};
