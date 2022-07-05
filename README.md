# dite

a little bit of a framework

- Deno-first
- Powered by esbuild
- Easy template creation
- HMR (Hot Module Reloading)

## creation

First, install dite (make sure you have deno installed first).

```bash
deno install -A --unstable -f -n=dite https://raw.githubusercontent.com/LeoDog896/dite/main/cli/index.ts
```

Create a new project with: `dite create <type> [project-name]`

## usage

Dite has two modes: dev (live server), and build (static support, coming soon).

To use these, do `deno task dev` or `deno task build` respectively.

## routing

Routing is currently done by finding the first matching route. For example, if
`/` is called, the route `index.?` is imported. If `/example` is called, the
route `example.?` is imported.

## but isn't there others?

this isn't meant to be a replacement for fresh or svel, but rather the backbone for any website. fresh and svel both cater to their respecitive preact and svelte situations, but dite is meant to be a more general solution.