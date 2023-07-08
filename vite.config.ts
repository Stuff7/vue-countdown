import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/vue-countdown/",
  publicDir: "./src/assets",
  build: {
    outDir: "./docs",
  },
  server: {
    port: 3000,
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/style/main.scss";',
      },
    },
  },
});
