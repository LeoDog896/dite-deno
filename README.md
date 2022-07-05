# dite

a little bit of a framework

NOTE: This is **not** a port of vite as the name suggests. Deno works
differently than node. Howwever, as dite also uses rollup for its backend, vite
plugin compatibility is a semi-goal.

Features:

- Deno (TypeScript first)
- Easy template creation

## routing

Routing is currently done by finding the first matching route. For example, if
`/` is called, the route `index.?` is imported. If `/example` is called, the
route `example.?` is imported.
