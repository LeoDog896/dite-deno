import { Command } from "https://deno.land/x/cliffy@v0.24.2/command/command.ts";
import vscode from "./vscode.ts";

export const additions: { [key: string]: Command | undefined } = {
  vscode,
};
