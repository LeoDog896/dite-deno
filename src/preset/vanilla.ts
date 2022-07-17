/**
 * The vanilla preset is the preset for a simple vanilla-based web application.
 *
 * Files do not have an exported function.
 */

import { Preset } from "./preset.ts";
import { base } from "./base.ts";

const self = base("vanilla");

const vanilla: Preset = ({ barebones } = {}) => ({
  config: {
    ...self.config,
    entry: (fileName) => `import "${fileName}"`,
    extension: ".ts",
  },
  files: [
    ...self.files,
    {
      path: "routes/index.ts",
      content: barebones
        ? `document.getElementById<HTMLDivElement>("app").innerHTML = "<p>Hello World!</p>"`
        : `import CounterElement from "$lib/counter.ts";

const app = document.getElementById<HTMLDivElement>("app");
app.innerHTML = "<p>Hello World!</p>";

app.appendChild(new CounterElement);        
`,
    },
    ...(barebones ? [] : [{
      path: "lib/counter.ts",
      content: // Modified from https://codepen.io/claviska/pen/abwGLPm?editors=0010 -- https://blog.codepen.io/documentation/licensing/
        `export default class CounterElement extends HTMLElement {
  static get observedAttributes() {
    return ['count'];
  }
  
  constructor() {
    super();
    this.state = {
      count: 0
    };
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = \`
      <button type="button">
        Count:
        <span class="count">\${this.state.count}</span>
      </button>
    \`;
    this.handleClick = this.handleClick.bind(this);
  }
  
  connectedCallback() {
    this.shadowRoot.querySelector('button').addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('button').removeEventListener('click', this.handleClick);
  }

  get count() {
    return this.state.count; 
  }
  
  set count(newCount) {
    this.state.count = newCount;
    this.update();
  }
  
  attributeChangedCallback(name, _, newValue) {
    if (name === 'count') {
      this.state.count = Number(newValue);
      this.update();
    }
  }
  
  handleClick() {
    this.count = this.count + 1;
  }
  
  update() {
    this.shadowRoot.querySelector('.count').textContent = this.state.count;     
  }
}

customElements.define('deno-counter', CounterElement);
`,
    }]),
  ],
  denoConfig: self.denoConfig,
});

export default vanilla;
