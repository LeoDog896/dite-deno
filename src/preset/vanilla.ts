import { Preset } from "./preset.ts";
import { base } from "./base.ts";

const vanilla: Preset = ({ barebones }) => ({
  config: {
    entry: (fileName) => `import "${fileName}"`,
  },
  files: [
    ...base("vanilla"),
    {
      path: "routes/index.ts",
      content: barebones
        ? `document.getElementById<HTMLDivElement>("app").innerHTML = "<p>Hello World!</p>"`
        : `import { counter } from "$lib/counter.ts";

const app = document.getElementById<HTMLDivElement>("app");
app.innerHTML = \`<p>Hello World!</p>\`;

const counterContainer = document.createElement("div");

counter(counterContainer);

app.appendChild(counterContainer);
`,
    },
    ...(barebones ? [] : [{
      path: "lib/counter.ts",
      content: `export const counter = (container: HTMLDivElement) => {
  let count = 0;
  const p = document.createElement("p");
  p.innerText = "Count: " + count;
  container.appendChild(p);

  const button = document.createElement("button");
  button.innerText = "Add 1";
  button.addEventListener("click", () => {
    count++;
    p.innerText = "Count: " + count;
  });

  container.appendChild(button);
}`,
    }]),
  ],
});

export default vanilla;
