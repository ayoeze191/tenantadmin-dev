import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#000130',
          'border-radius-base': '9px',
          'font-family': 'SF Compact Text, sans-serif',
        },
        javascriptEnabled: true,
      },
    },
  },
});
// Ant Design Vue theme variables set: primary color, border radius, font family
