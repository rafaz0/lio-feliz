import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/presentation/tests/setup.ts"],
    include: [
      "src/core/tests/**/*.test.ts",
      "src/application/tests/**/*.test.ts",
      "src/infrastructure/tests/**/*.test.ts",
      "src/presentation/**/*.test.{ts,tsx}",
    ],
  },
});
