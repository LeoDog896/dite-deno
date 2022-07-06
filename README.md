# dite

a little bit of a framework

- Deno-first
- Powered by esbuild (with import-map support)
- Preset usage
- HMR (Hot Module Reloading)

## creation

First, install dite (make sure you have deno installed first).

```bash
deno install -A --unstable -f -n=dite https://deno.land/x/dite/cli/index.ts
```

Then, create a new project with: `dite create <type> [project-name]`

### additions

You can add new features to your project with: `dite add <feature>`.

For example, for simple vscode intergration, do `dite add vscode` in your
project.

## usage

Dite has two modes: dev (live server), and build (static support, coming soon).

To use these, do `deno task dev` or `deno task build` respectively.

## frameworks

Dite currently only supports a vanilla framework. `preact` and `svelte` are
coming soon but are availalbe for testing.

## routing

Routing is currently done by finding the first matching route. For example, if
`/` is called, the route `index.?` is imported. If `/example` is called, the
route `example.?` is imported.
