import { Preset } from "./preset.ts";
import { base } from "./base.ts";
import { SveltePlugin, sveltePlugin } from "../esbuild/svelte.ts";
import { deepmerge } from "../../import/deepmerge.ts";

const self = base("svelte");

const svelte: Preset<{ plugins: SveltePlugin[] }> = (options) => ({
  config: {
    ...self.config,
    entry: (fileName: string) =>
      `import App from "${fileName}";

const app = new App({
  target: document.getElementById("app"),
});
`,
    extension: ".svelte",
    plugins: [
      sveltePlugin(options?.plugins),
    ],
  },
  files: [
    ...self.files,
    {
      path: "routes/index.svelte",
      content: `<script>
  import Counter from "$lib/Counter.svelte"
</script>

<div id="container">
  <h1>Hello Svelte</h1>
  <p class="subtitle">Learn how to use svelte at <a href="https://svelte.dev/">https://svelte.dev/</a></p>
  <Counter />
</div>

<style>
  #container {
    text-align: center;
    margin-top: 4rem;
    font-family: Calibri, sans-serif;
  }

  h1 {
    font-size: 4rem;
    color: orange;
  }

  .subtitle {
    font-size: 1.3rem;
    color: gray;
  }
</style>
`,
    },
    {
      path: "lib/Counter.svelte",
      content: `<script lang="ts">
  let count = 0
</script>

<br/>
<button class="add" on:click={() => count++}>+</button>
<span class="count">Count: {count}</span>
<button class="minus" on:click={() => count--}>-</button>

<style>
  .count {
    font-size: 1.2rem;
  }

  button {
    color: #fff;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: none;
    font-size: 1.5rem;
    width: 50px;
    margin-right: 10px;
    margin-left: 10px;
    height: 50px;
    transition: all 0.2s;
  }

  button:hover {
    filter: brightness(0.85);
  }

  button:active {
    outline: 1px solid #000;
  }

  .add {
    background-color: skyblue;
  }

  .minus {
    background-color: lightcoral;
  }
</style>`,
    },
  ],
  denoConfig: deepmerge(self.denoConfig, {
    imports: {
      "svelte": "https://esm.sh/svelte@3.58.0",
      "svelte/": "https://esm.sh/svelte@3.58.0?path=///",
    },
  }),
});

export default svelte;
