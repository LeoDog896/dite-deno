# dite

a little bit of a framework

- Deno-first
- Powered by esbuild
- Easy template creation

## creation

First, install dite.

```bash
```

Create a new project with: `dite create <type> [project-name]`

## usage

Dite has two modes: dev (live server), and build (static support, coming soon).

To use these, do `deno task dev` or `deno task build` respectively.

## routing

Routing is currently done by finding the first matching route. For example, if
`/` is called, the route `index.?` is imported. If `/example` is called, the
route `example.?` is imported.
