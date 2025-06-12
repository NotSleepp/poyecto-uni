import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./Home": "./src/views/Home.vue",
        "./store": "./src/stores/sharedStore.js",
        "./eventBus": "./src/utils/eventBus.js",
        "./NotificationListener": "./src/components/NotificationListener.vue",
        "./ModalListener": "./src/components/ModalListener.vue"
      },
      shared: ["vue", "pinia", "vue-router"],
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
  base: "/frontend/home/",
});
