import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/style.css';

// Utilidades
import { initFetchInterceptor } from './utils/fetchInterceptor';
import { useAuthStore } from './stores/authStore';
import { token as fallbackToken } from './token.js';

console.log('[Biblioteca] Iniciando aplicación standalone');

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

// Inyectamos interceptor de fetch para añadir Authorization y loader
initFetchInterceptor();

// Si no hay token en localStorage y existe fallbackToken, lo seteamos
const authStore = useAuthStore();
if (!authStore.token && fallbackToken) {
  authStore.setToken(fallbackToken);
}

app.mount('#app');

console.log('[Biblioteca] Aplicación montada');
