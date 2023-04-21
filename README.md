# dite

a /little bit/ of a framework

- Deno-first
- Typescript-first support
- 0 configuration needed
- Powered by esbuild (with import-map support)
- Preset usage
- Refresh on save

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

Dite has support for `react`, `preact`, and `svelte`.

## routing

Routing is currently done by finding the first matching route. For example, if
`/` is called, the route `index.?` is imported. If `/example` is called, the
route `example.?` is imported.
