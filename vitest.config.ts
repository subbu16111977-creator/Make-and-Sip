import { defineConfig } from "vitest/config";
import path from "node:path";

/**
 * Config for the pure-logic test suite only (normalization, matching,
 * and context action logic extracted into plain functions). No React
 * Native rendering is exercised here — that's intentionally out of
 * scope so this stays fast and dependency-free.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
});
