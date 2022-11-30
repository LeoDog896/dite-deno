import { Command } from "https://deno.land/x/cliffy@v0.25.4/command/mod.ts";
import { createFile } from "../../util/createFile.ts";
import { blue, white } from "../theme.ts";

const files = [
  {
    path: ".gitpod.yml",
    content: `image:
  file: .gitpod.Dockerfile
vscode:
  extensions:
    - denoland.vscode-deno
`,
  },
  {
    path: ".gitpod.Dockerfile",
    content: `FROM gitpod/workspace-full
RUN curl -fsSL https://deno.land/x/install@v0.1.7/install.sh | sh
RUN /home/gitpod/.deno/bin/deno completions bash > /home/gitpod/.bashrc.d/90-deno && \\
    echo 'export DENO_INSTALL="/home/gitpod/.deno"' >> /home/gitpod/.bashrc.d/90-deno && \\
    echo 'export PATH="$DENO_INSTALL/bin:$PATH"' >> /home/gitpod/.bashrc.d/90-deno`,
  },
];

export default new Command()
  .name("gitpod")
  .description("Add gitpod integration to your project")
  .action(() => {
    files.forEach((file) => createFile(file));
    console.log(
      `Added %cgitpod! %cRestart the gitpod workspace fully (after pushing your changes), and build the image docker if necessary."`,
      blue,
      white,
    );
  });
