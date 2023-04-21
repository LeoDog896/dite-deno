ARG VARIANT=bullseye
FROM --platform=linux/amd64 mcr.microsoft.com/devcontainers/base:0-${VARIANT}

ENV DENO_INSTALL=/deno
RUN mkdir -p /deno \
    && curl -fsSL https://deno.land/x/install@v0.1.7/install.sh | sh \
    && chown -R vscode /deno

ENV PATH=${DENO_INSTALL}/bin:/home/vscode/.deno/bin:${PATH} \
    DENO_DIR=${DENO_INSTALL}/.cache/deno

