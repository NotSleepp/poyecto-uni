import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { fileURLToPath, URL } from 'node:url'

// const isDev = process.env.NODE_ENV === "development";
const isDev = false;

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "host",
      remotes: {
        home: {
          external: "https://autogestion2.atlantida.edu.ar/frontend/home/assets/remoteEntry.js",
          format: 'esm',
          from: 'vite'
        },
        noticias: {
          external: "https://autogestion2.atlantida.edu.ar/frontend/noticias/assets/remoteEntry.js",
          format: 'esm',
          from: 'vite'
        },
        perfil: isDev
          ? "http://localhost:5003/assets/remoteEntry.js"
          : "https://autogestion2.atlantida.edu.ar/frontend/perfil/assets/remoteEntry.js"
      },
      shared: ["vue", "vue-router", "pinia"],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
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
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        minifyInternalExports: false,
      },
    },
  },
  base: "/",
});
