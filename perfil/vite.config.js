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
      remotes: {
        host: {
          external: "https://autogestion2.atlantida.edu.ar/assets/remoteEntry.js",
          format: 'esm',
          from: 'vite'
        }
      },
      exposes: {
        "./Perfil": "./src/views/Perfil.vue",
        "./store": "./src/stores/sharedStore.js",
        "./userStore": "./src/stores/userStore.js",
        "./careerStore": "./src/stores/careerStore.js",
        "./AcademicHistoryModal": "./src/components/AcademicHistoryModal.vue",
        "./DocumentationModal": "./src/components/DocumentationModal.vue"
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
  server: {
    port: 5000,
    cors: true,
    proxy: {
      '/api': {
        target: 'https://backend.autogestion.atlantida.edu.ar',
        changeOrigin: true,
        secure: false
      }
    }
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
  base: "/frontend/perfil/",
});
