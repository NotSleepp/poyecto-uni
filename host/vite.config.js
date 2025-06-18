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
      filename: "remoteEntry.js",
      remotes: {
        host: {
          external:"https://autogestion2.atlantida.edu.ar/assets/remoteEntry.js",
          format: 'esm',
          from: 'vite'
        },
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
        perfil: {
          external: "https://autogestion2.atlantida.edu.ar/frontend/perfil/assets/remoteEntry.js",
          format: 'esm',
          from: 'vite'
        },
        biblioteca: {
          external: "https://autogestion2.atlantida.edu.ar/frontend/biblioteca/assets/remoteEntry.js",
          format: 'esm',
          from: 'vite'
        }
      },
      // Aseguramos que host y remotos compartan **la misma** instancia de Vue, Vue-Router y Pinia.
      // Si no se especifica la versión requerida, el runtime de federación asume "undefined" y los
      // micro-fronts pueden terminar cargando su propia copia, lo que provoca errores como
      //   provider support vue(undefined) is not satisfied requiredVersion(^3.4.15)
      //   provider support pinia(undefined) is not satisfied requiredVersion(^3.0.3)
      // Con singleton: true forzamos una única copia en toda la aplicación.
      shared: {
        vue: { singleton: true, version: "^3.4.15" },
        "vue-router": { singleton: true, version: "^4.2.5" },
        pinia: { singleton: true, version: "^3.0.3" }
      },
      exposes: {
        "./eventBus": "./src/utils/eventBus.js",
        "./NotificationListener": "./src/components/NotificationListener.vue",
        "./ModalListener": "./src/components/ModalListener.vue",
        "./authStore": "./src/stores/authStore.js",
      },
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
