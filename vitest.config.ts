import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./test-setup.ts"],
    include: ["app/**/*.test.ts"],
    exclude: ["node_modules/**", "dist/**", ".nuxt/**", "coverage/**"],
  },
  resolve: {
    alias: {
      "~": resolve(__dirname, "."),
      "~/": resolve(__dirname, "./"),
      "@": resolve(__dirname, "."),
    },
  },
});
