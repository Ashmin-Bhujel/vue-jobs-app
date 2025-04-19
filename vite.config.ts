import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";
import ui from "@nuxt/ui/vite";
import nuxtUIConf from "./nuxtUIConf";

// https://vite.dev/config/
export default defineConfig({
  // plugins: [vue(), vueDevTools(), tailwindcss(), ui(nuxtUIConf)],
  plugins: [vue(), tailwindcss(), ui(nuxtUIConf)],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
