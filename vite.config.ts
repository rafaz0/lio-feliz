// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
//
// Plataforma oficial: Vercel (ADR-013-001)
// - Local / Lovable sandbox: usa nitro com preset cloudflare-module (default).
// - Vercel: define NITRO_PRESET=vercel nas env vars do projeto.
//   Nitro v3 detecta automaticamente e faz o output correto para serverless functions.
// - Para testar o build Vercel localmente: NITRO_PRESET=vercel npm run build
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({});
