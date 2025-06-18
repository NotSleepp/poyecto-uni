import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const isDev = false;

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "biblioteca",
      filename: "remoteEntry.js",
      remotes: {
        host: {
          external: 'https://autogestion2.atlantida.edu.ar/assets/remoteEntry.js',
          format: 'esm',
          from: 'vite'
        }
      },
      exposes: {
        "./BibliotecaView": "./src/views/BibliotecaView.vue",
        "./CatalogView": "./src/views/CatalogView.vue",
        "./sharedStore": "./src/stores/sharedStore.js"
      },
      shared: {
        vue: { singleton: true },
        pinia: { singleton: true },
        'vue-router': { singleton: true }
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        minifyInternalExports: false,
      },
    },
  },
  server: {
    port: 5000,
    cors: true
  },
  base: "/frontend/biblioteca/",
});
