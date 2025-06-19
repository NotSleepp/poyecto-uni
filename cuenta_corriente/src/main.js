import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/style.css';

import { initFetchInterceptor } from './utils/fetchInterceptor';

console.log('[CuentaCorriente] Iniciando aplicación standalone');

const app = createApp(App);
app.use(createPinia());
app.use(router);

// Inicializar interceptor de fetch para manejar loading y tokens
initFetchInterceptor();

app.mount('#app');

console.log('[CuentaCorriente] Aplicación montada');
