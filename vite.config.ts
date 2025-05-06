import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";

export default mergeConfig(
  defineConfig({
    plugins: [react()],
  }),
  defineVitestConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/test/setup.ts"],
      css: true,
    },
  })
);
