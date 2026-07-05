// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { copyFileSync } from "node:fs";
import { resolve, dirname } from "node:path";

// O plugin `preview-server-plugin` do @tanstack/start-plugin-core procura o entry
// SSR em `<outDir>/<basename>.js`. Como o preset `cloudflare-module` do Nitro
// emite o bundle SSR como `index.mjs`, o `vite preview` quebra com
// `Cannot find module dist/server/server.js`.
//
// Como corrigido do diagnóstico Lovable (jul/2026):
// - Não sobrescrever `tanstackStart.server.entry`.
// - Após o build Nitro, criar `server.js` que apenas re-exporta o entry do
//   `index.mjs`. O plugin encontra o arquivo e o `import()` resolve o
//   default export para o mesmo módulo do Cloudflare preset.
export default defineConfig({
  vite: {
    plugins: [
      {
        name: "copy-server-js-compat",
        apply: "build",
        enforce: "post",
        closeBundle() {
          try {
            const src = resolve(process.cwd(), "dist/server/index.mjs");
            const dest = resolve(process.cwd(), "dist/server/server.js");
            copyFileSync(src, dest);
            // eslint-disable-next-line no-console
            console.log(
              "[copy-server-js-compat] dist/server/server.js created for preview-server-plugin compatibility.",
            );
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(
              "[copy-server-js-compat] could not copy dist/server/index.mjs -> dist/server/server.js:",
              e instanceof Error ? e.message : String(e),
            );
          }
        },
      },
    ],
  },
});
